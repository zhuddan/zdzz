<script lang="ts" setup>
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Comment, computed, nextTick, onMounted, ref, useSlots, watch } from 'vue';
import { Loading } from '../Loading';
import { Icon } from '../Icon';

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['error']);
defineOptions({
  name: 'ExcelRender',
});

const loading = ref(false);
const tableau = ref('');
const isError = ref(false);
const errorMsg = ref('');
const slots = useSlots();
const isCommentSlot = computed(() => {
  if (!slots.default) return true;
  return slots.default?.()?.every(e => e.type === Comment);
});
function render() {
  if (!props.url) return;
  isError.value = false;
  loading.value = true;
  axios
    .get(props.url, {
      responseType: 'blob', //
    })
    .then((res) => {
      try {
        const data = res.data;
        const legalTypes = ['text/xml', 'application/msexcel', 'application/vnd.ms-excel'];
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
                emit('error', errorMsg.value);
              }
              catch (error) {
                errorMsg.value = `${props.url} 格式不正确`;
                emit('error', errorMsg.value);
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
        emit('error', errorMsg.value);
      }
    })
    .catch((err) => {
      isError.value = true;
      errorMsg.value = String(err);
      emit('error', errorMsg.value);
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
watch(() => props.url, render, { immediate: true });
defineExpose({
  render,
});
</script>

<template>
  <div class="excel-render">
    <template v-if="!isError && !loading">
      <div class="excel-render-wrap" v-html="tableau"></div>
    </template>

    <template v-else>
      <template v-if="loading">
        <slot v-if="slots.loading" name="loading"></slot>
        <Loading v-else class="inner" />
      </template>

      <template v-if="isError">
        <template v-if="!isCommentSlot">
          <slot :error-msg="errorMsg" :is-error="isError" :loading="loading" :update="render"></slot>
        </template>

        <template v-else>
          <slot v-if="slots.error" name="error" :error-msg="errorMsg"></slot>
          <template v-else>
            <div class="error-inner inner">
              <Icon icon="ep:circle-close-filled" color="#f56c6c" size="64" />
              <p>
                {{ errorMsg }}
              </p>
            </div>
          </template>

          <template v-if="slots['refresh-btn']">
            <slot name="refresh-btn" :update="render"></slot>
          </template>

          <template v-else>
            <div style="text-align: center;">
              <button class="button error" @click="render">
                刷新
              </button>
            </div>
          </template>
        </template>
      </template>
    </template>
  </div>
</template>
