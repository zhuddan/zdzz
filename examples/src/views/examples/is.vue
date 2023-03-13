<script setup lang="ts">
import { isDate, isEmpty, isNull, isNumber, isObject, isPromise, isUnDef } from '@zdzz/shared';
import { nextTick } from 'vue';
const list: {
  input: string;
  result: boolean;
}[] = [
  {
    input: 'isUnDef()',
    result: isUnDef(),
  },
  {
    input: 'isUnDef(1)',
    result: isUnDef(1),
  },
  {
    input: 'isObject("")',
    result: isObject(''),
  },
  {
    input: 'isObject({})',
    result: isObject({}),
  },
  {
    input: 'isObject(location)',
    result: isObject(location),
  },
  {
    input: 'isEmpty("")',
    result: isEmpty(''),
  },
  {
    input: 'isEmpty(undefined)',
    result: isEmpty(undefined),
  },
  {
    input: 'isEmpty(null)',
    result: isEmpty(null),
  },
  {
    input: 'isEmpty(0)',
    result: isEmpty(0),
  },
  {
    input: 'isDate({})',
    result: isDate({}),
  },
  {
    input: 'isDate(location)',
    result: isDate(location),
  },
  {
    input: 'isNull(0)',
    result: isNull(0),
  },
  {
    input: 'isNull(null)',
    result: isNull(null),
  },
  {
    input: 'isNumber(1)',
    result: isNumber(1),
  },
  {
    input: 'isNumber(NaN)',
    result: isNumber(NaN),
  },
  {
    input: 'isPromise',
    result: isPromise(() => {}),
  },
];
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>输入</th>
        <th>输出</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in list" :key="index">
        <td>{{ item.input }}</td>
        <td>{{ item.result }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>