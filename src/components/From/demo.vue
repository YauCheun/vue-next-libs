<template>
  <a-form-item label="姓名">
    <template #label>
      <b>xingming</b>
    </template>
    <a-input placeholder="请输入姓名"></a-input>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "demoFrom",
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
