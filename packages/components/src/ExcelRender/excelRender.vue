<script lang="ts" setup>
import axios from 'axios';
import * as XLSX from 'xlsx';
import { nextTick, ref, useSlots, watch } from 'vue';

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
});

const loading = ref(false);
const tableau = ref('');

const isError = ref(false);
const errorMsg = ref('');
function update() {
  if (!props.url) return;
  loading.value = true;
  axios
    .get(props.url, {
      responseType: 'blob', //
    })
    .then((res) => {
      try {
        const data = res.data;
        const legalTypes = ['text/xml', 'application/msexcel'];
        isError.value = !legalTypes.includes(data.type);
        const fr = new FileReader();
        fr.readAsArrayBuffer(data);
        fr.onload = function () {
          if (isError.value) {
            const reader = new FileReader();
            reader.readAsText(res.data, 'utf-8');
            reader.onload = function () {
              try {
                const data = JSON.parse(reader.result as string);
                errorMsg.value = data.msg;
              }
              catch (error) {
                errorMsg.value = `${props.url} 格式不正确`;
              }
            };
          }
          else {
            const ab = this.result;
            const workbook = XLSX.read(new Uint8Array(ab as ArrayBuffer), { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            tableau.value = XLSX.utils.sheet_to_html(worksheet);
            isError.value = false;
            nextTick(fixTable);
          }
        };
      }
      catch (error) {
        isError.value = true;
        errorMsg.value = String(error);
      }
    })
    .catch((err) => {
      isError.value = true;
      errorMsg.value = String(err);
      console.log(['try error 3']);
    })
    .finally(() => {
      loading.value = false;
    });
}

function fixTable() {
  const bonds = document.querySelector('.bonds');
  if (bonds) {
    const tdList = bonds.querySelectorAll('td');
    for (let index = 0; index < tdList.length; index++) {
      const td = tdList[index];
      const text = td.innerText;
      if (text.length >= 100) {
        const div = document.createElement('div');
        div.className = 'text_overflow-3';
        div.innerText = text;
        div.title = text;
        td.innerHTML = '';
        td.style.width = '100px';
        td.appendChild(div);
      }
    }
  }
}
watch(() => props.url, update, { immediate: true });

// function handleChange(e: Event) {
//   const input = e.target as HTMLInputElement;
//   console.log(input.files?.[0].type);
// }
const slot = useSlots();
</script>

<template>
  <div element-loading-text="加载中..." class="excel_view">
    <template v-if="!isError">
      <div class="excel_view_wrap" v-html="tableau">
      </div>
    </template>
    <div
      v-else
      class="error-wrap"
    >
      <div v-if="slot?.error">
        <slot name="error"></slot>
      </div>

      <template v-else>
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon-error"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" /></svg>
        <p>
          {{ errorMsg }}
        </p>
      </template>
      <button class="refresh-btn" @click="update">
        刷新
      </button>
    </div>
  </div>
</template>

