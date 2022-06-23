<template>
  <a-form-item label="姓名" prop="name" :rules="nameRules">
    <template #label>
      <b>xingming</b>
    </template>
    <a-input v-model="form.name" placeholder="请输入姓名"></a-input>
  </a-form-item>
</template>

<script lang="ts">
// import { RuleItem } from "async-validator";
import { defineComponent, reactive, ref } from "vue";
import { AntRuleItem } from "./types";
export default defineComponent({
  name: "demoFrom",
  setup(props, { emit }) {
    const form = reactive({
      name: "2323",
    });
    const nameRules = ref<AntRuleItem[]>([
      {
        required: true,
        message: "请填写姓名",
      },
      {
        max: 6,
        message: "请输入六位",
        trigger: "change",
      },
    ]);
    return {
      form,
      nameRules,
    };
  },
});
</script>

<style scoped lang="scss"></style>
