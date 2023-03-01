export {};
function baseHooks() {}
import { isFunction } from '@zdzz/shared';
console.log(isFunction(baseHooks));

export const isHooksTest = isFunction(baseHooks);
