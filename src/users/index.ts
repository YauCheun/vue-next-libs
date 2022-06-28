import { getCurrentInstance } from "@vue/runtime-core";
function useExpose<T>(extra: T) {
  const instance = getCurrentInstance();
  if (instance && extra !== null) {
    Object.assign(instance.proxy, extra);
  }
}
export { useExpose };
