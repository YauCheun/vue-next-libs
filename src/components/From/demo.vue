<template>
  <a-form :modal="form" :rules="formRules" ref="myForm">
    <a-form-item label="姓名" prop="name">
      <a-input v-model="form.name" placeholder="请输入姓名"></a-input>
    </a-form-item>
    <a-form-item label="密码" prop="password">
      <a-input
        v-model="form.password"
        type="password"
        placeholder="请输入姓名"
      ></a-input>
    </a-form-item>
    <a-form-item label="密码" prop="password">
      <button @click="submit">提交</button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
// import { RuleItem } from "async-validator";
import { defineComponent, reactive, ref } from "vue";
import { AntRuleItem, AntRuleForm, validateFunc } from "./types";
export default defineComponent({
  name: "demoFrom",
  setup(props, { emit }) {
    const form = reactive({
      name: "2323",
      password: "123",
    });
    const myForm = ref<validateFunc | null>(null);
    const submit = () => {
      // myForm.value.val;
    };
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
    const formRules = ref<AntRuleForm>({
      name: [
        {
          required: true,
          message: "请填写姓名",
        },
        {
          max: 6,
          message: "请输入六位",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "请填写密码",
        },
        {
          max: 8,
          message: "请输入8位",
          trigger: "change",
        },
      ],
    });
    return {
      form,
      nameRules,
      formRules,
      submit,
    };
  },
});
</script>

<style scoped lang="scss"></style>
