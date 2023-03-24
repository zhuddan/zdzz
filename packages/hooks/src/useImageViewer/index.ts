import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';
import { computed, nextTick, onBeforeUnmount, watch } from 'vue';
import { useComputedRef } from '../useComputedRef';

export function useImageViewer(arrayableImage: MaybeComputedRef<string | string[]>, options: Viewer.Options = {}) {
  let viewer: Nullable<Viewer> = null;
  let imageElement: Nullable<HTMLImageElement> = null;
  let imageListElement: Nullable<HTMLDivElement> = null;
  const imageSrc = useComputedRef(arrayableImage);
  const isImageList = computed(() => imageSrc instanceof Array);

  function getOptions() {
    const defaultOptions: Viewer.Options = {
      button: true,
      navbar: isImageList.value,
      loading: false,
      toolbar: {
        // 翻转
        flipHorizontal: false,
        flipVertical: false,
        //
        prev: isImageList.value,
        oneToOne: true,
        next: isImageList.value,
        play: false,
        reset: true,
        rotateRight: true,
        rotateLeft: true,
        zoomIn: true,
        zoomOut: true,
      },
      transition: !isImageList.value,
    };

    return {
      ...defaultOptions,
      ...options,
    };
  }

  function updateELement() {
    destroy();
    if (imageSrc.value instanceof Array) {
      imageListElement = document.createElement('div');
      imageSrc.value.forEach((src) => {
        const img = new Image();
        img.src = src;
        imageListElement?.appendChild(img);
      });
    }
    else {
      imageElement = new Image();
      imageElement.src = imageSrc.value;
    }
  }

  function getElement() {
    return (imageSrc.value instanceof Array ? imageListElement : imageElement) as HTMLElement;
  }

  async function update() {
    await nextTick();

    if (viewer) {
      viewer.destroy();
      viewer = null;
    }

    if (imageSrc.value) {
      updateELement();
      if (!viewer)
        viewer = new Viewer(getElement(), getOptions());
    }
  }

  function view(index?: number) {
    if (isImageList.value)
      viewer?.view(index);
    else
      viewer?.show();
  }

  function destroy() {
    imageElement?.remove();
    imageListElement?.remove();
  }
  onBeforeUnmount(destroy);

  watch(imageSrc, update, { immediate: true, deep: true });

  return {
    viewer,
    view,
  };
}