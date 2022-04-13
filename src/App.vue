<template>
  <div class="contianer">
    <demo-input />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import demoInput from "./components/Input/demo.vue";
export default defineComponent({
  name: "App",
  components: {
    demoInput,
  },
});
</script>

<style lang="scss">
.contianer {
  color: $text-color;
}
</style>
