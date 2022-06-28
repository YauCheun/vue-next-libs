import { defineComponent, inject, PropType, provide } from "vue";
import "./index.scss";
import { AntRuleForm, FormContent, FormKey, validateFunc } from "../From/types";
import { useExpose } from "@/users";
import { ValidateError } from "async-validator";
export default defineComponent({
  name: "AForm",
  props: {
    model: Object,
    rules: Object as PropType<AntRuleForm>,
  },
  setup(props, ctx) {
    provide<Partial<FormContent>>(FormKey, {
      model: props.model,
      rules: props.rules,
    });
    const validate = (callback?: (valid: boolean) => void): Promise<boolean | ValidateError> => {
      return Promise.resolve(true)
    }
    ctx.expose(validate)
    // useExpose<{validate:validateFunc}>({validate})
    return () => {
      return <div class="ant-form">{ctx.slots.default!()}</div>;
    };
  },
});
