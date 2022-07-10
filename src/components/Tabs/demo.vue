<template>
  <a-tabs v-model="currentName">
    <a-tab-pane name="tab1">
      <template #title="name">
        <b style="color: red">costom-{{ name }} </b>
      </template>
      werqwerqwr1</a-tab-pane
    >
    <a-tab-pane name="tab2">洒r水</a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "demoTabs",
  setup(props, { emit }) {
    const currentName = ref<string>("tab2");
    return {
      currentName,
    };
  },
});
</script>

<style scoped lang="scss"></style>
