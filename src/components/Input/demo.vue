<template>
  {{ text }}
  <a-input v-model="text"></a-input>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AInput from "./index";
export default defineComponent({
  name: "demoInput",
  components: {
    AInput,
  },
  setup(props, { emit }) {
    const text = ref<string>("aaaaa");
    return {
      text,
    };
  },
});
</script>

<style scoped lang="scss"></style>
