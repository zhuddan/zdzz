<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { getToken, removeToken, setToken } from '../../utils/cache';

const input = ref('');
const result = ref('');
function handleGetToken() {
  result.value = `${getToken()}`;
}

async function handleSetToken(v: string) {
  setToken(v);
  await nextTick();
  handleGetToken();
}

async function handleRemoveToken() {
  removeToken();
  await nextTick();
  handleGetToken();
}
handleGetToken();
</script>

<template>
  <div>
    cache

    <table>
      <tbody>
        <tr>
          <td>
            <button @click="handleSetToken(input)">
              set token
            </button>
          </td>
          <td>
            <input v-model="input" type="text">
          </td>
        </tr>
        <tr>
          <td>
            <button @click="handleGetToken">
              get token
            </button>
          </td>
          <td>
            <input v-model="result" type="text" readonly>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button @click="handleRemoveToken">
              remove token
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>