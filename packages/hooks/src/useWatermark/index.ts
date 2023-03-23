import { isUnDef } from '@zdzz/shared';
import type { CSSProperties, Ref } from 'vue';
import { nextTick, onBeforeMount, onMounted, ref, unref, watch } from 'vue';
import { useComputedRef } from '../useComputedRef';

interface UseWatermarkImageOption {
  width?: number;
  height?: number;
  rotate?: number;
}

type UseWatermarkImageOptionFull = Partial<UseWatermarkImageOption & CanvasTextDrawingStyles & CanvasFillStrokeStyles>;

function useWatermarkImage(str: MaybeComputedRef<string>, options: MaybeComputedRef<UseWatermarkImageOptionFull> = {}) {
  const strRef = useComputedRef(str);
  const opt = useComputedRef(options);
  const mergeOptions = useComputedRef<UseWatermarkImageOptionFull>(() => ({
    font: '10px Vedana ',
    fillStyle: 'rgba(0, 0, 0, .3)',
    textAlign: 'left',
    textBaseline: 'middle',
    ...opt.value,
  }));
  const base64 = ref('');
  async function update() {
    const _mergeOptions = mergeOptions.value;
    const can = document.createElement('canvas');
    const width = _mergeOptions.width || 150;
    const height = _mergeOptions.height || 80;
    const cans = can.getContext('2d')!;
    cans.clearRect(0, 0, width, height);
    const defaultRotate = (-20 * Math.PI) / 150;
    cans.rotate(isUnDef(_mergeOptions.rotate) ? defaultRotate : _mergeOptions.rotate);
    for (const key in _mergeOptions) {
      if (Object.prototype.hasOwnProperty.call(_mergeOptions, key)) {
        const element = _mergeOptions[key];
        cans[key] = element;
      }
    }
    cans.fillText(strRef.value, width / 20 - 10, height);
    await nextTick();
    base64.value = can.toDataURL('image/png');
  }

  watch([strRef, mergeOptions], update, { immediate: true, deep: true });

  return {
    base64,
  };
}

export function useWatermark(el: Ref<Nullable<HTMLElement>>, name: MaybeComputedRef<string>, style: MaybeComputedRef<UseWatermarkImageOptionFull> = {}) {
  const watermarkName = useComputedRef(name);
  const options = useComputedRef(style);
  const { base64 } = useWatermarkImage(watermarkName, options);
  const div = document.createElement('div');
  const elStyle = useComputedRef<CSSProperties>(() => ({
    pointerEvents: 'none',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    position: 'absolute',
    zIndex: 999,
    background: `url(${base64.value}) left top repeat `,
    // ...styleObj.value,
  }));

  function updateStyle() {
    for (const key in elStyle.value) {
      if (Object.prototype.hasOwnProperty.call(elStyle.value, key)) {
        const styleValue = elStyle.value[key];
        div.style[key] = styleValue;
      }
    }
  }

  watch(elStyle, updateStyle, { immediate: true, deep: true });

  // const VNode = () => h('div', {
  //   style: elStyle.value,
  //   class: 'watermark',
  // });
  function addWatermark() {
    const dom = unref(el) as HTMLElement;
    dom.appendChild(div);
  }
  function removeWatermark() {
    div.remove();
  }
  onMounted(() => {
    const dom = unref(el) as HTMLElement;
    dom.style.position = 'relative';
    addWatermark();
  });

  onBeforeMount(() => {
    removeWatermark();
  });
  return {
    div,
    addWatermark,
    removeWatermark,
  };
}
