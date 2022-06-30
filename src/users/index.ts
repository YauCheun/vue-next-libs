import { getCurrentInstance } from "@vue/runtime-core";
function useExpose<T>(extra: T) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      instance.proxy!,
      extra
    );
  }
}
export { useExpose };
