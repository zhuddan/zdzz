/**
 *
 * @param str
 * @param strict 是否除首字母之外的字母都变成小写
 * eg:
 *  capitalize('userName', true) ==> Username
 *  capitalize('userName', false) ==> UserName
 * @returns
 */
export function capitalize(str: string, strict = true) {
  const str1 = str.slice(0, 1).toUpperCase();
  const str2 = str.slice(1);
  return `${str1}${strict ? str2.toLocaleLowerCase() : str2}`;
}