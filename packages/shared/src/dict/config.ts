import type { DictBaseOptions, FormatDictOptions } from './typings';

export const defaultRuoyiDictsOptions: DictBaseOptions = {
  labelFields: ['label', 'dictLabel', 'name', 'title'],
  valueFields: ['value', 'dictValue', 'code', 'key'],
  isLazy: false,
};
export const defaultFormatDictOptions: Required<FormatDictOptions> = {
  symbol: '/',
  isRaw: false,
  valueField: 'value',
  labelField: 'label',
};