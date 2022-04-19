<template>
  <div class="contianer">
    <demo-from />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import demoInput from "./components/Input/demo.vue";
import demoFrom from "./components/From/demo.vue";
export default defineComponent({
  name: "App",
  components: {
    // demoInput,
    demoFrom,
  },
});
</script>

<style lang="scss">
.contianer {
  color: $text-color;
}
</style>
