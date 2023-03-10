export function createUuid() {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url); // 释放这个url
  return uuid.substring(uuid.lastIndexOf('/') + 1);
}