<template>
  {{ text }}
  <a-input v-model="text" type="password"></a-input>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "demoInput",
  setup(props, { emit }) {
    const text = ref<string>("aaaaa");
    return {
      text,
    };
  },
});
</script>

<style scoped lang="scss"></style>
