import { defineComponent, inject, PropType, provide } from "vue";
import "./index.scss";
import {
  AntRuleForm,
  FormContent,
  FormItemContent,
  FormKey,
  validateFunc,
} from "../From/types";
// import { useExpose } from "@/users";
import { ValidateError } from "async-validator";
import { useExpose } from "@/users";
export default defineComponent({
  name: "AForm",
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object as PropType<AntRuleForm>,
  },
  setup(props, ctx) {
    const formItem: Partial<FormItemContent>[] = [];
    const addItem = (item: Partial<FormItemContent>): void => {
      formItem.push(item);
    };
    const removeItem = (id: string) => {
      if (formItem.length) {
        const index = formItem.findIndex((i) => i.id === id);
        if (index >= 0) {
          formItem.splice(index, 1);
        }
      }
    };
    const validate = (
      callback?: (valid: boolean) => void
    ): Promise<boolean | ValidateError> => {
      return Promise.all(
        formItem
          .filter((item) => item.prop)
          .map((item) => item!.validate!(props.model[item.prop!]))
      )
        .then(() => {
          if (callback) {
            callback(true);
          }
          return Promise.resolve(true);
        })
        .catch((errors) => {
          if (callback) {
            callback(false);
          }
          return Promise.reject(false);
        });
    };
    provide<Partial<FormContent>>(FormKey, {
      model: props.model,
      rules: props.rules,
      addItem,
      removeItem,
    });
    // ctx.expose({ validate });
    useExpose<{ validate: validateFunc }>({ validate });
    return () => {
      return <div class="ant-form">{ctx.slots.default!()}</div>;
    };
  },
});
