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
  emits: ["validate"],
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
      ).then((res) => {
        if (res.some((i) => i !== true)) {
          if (callback) {
            callback(false);
          }
          ctx.emit("validate", false);
          return Promise.reject(res.find((i) => i !== true));
        } else {
          if (callback) {
            callback(true);
          }
          ctx.emit("validate", true);
          return Promise.resolve(true);
        }
      });
      // .catch((errors) => {
      //   console.log(errors);
      //   if (callback) {
      //     callback(false);
      //   }
      //   return Promise.reject(errors);
      // });
    };
    provide<Partial<FormContent>>(FormKey, {
      model: props.model,
      rules: props.rules,
      addItem,
      removeItem,
    });
    const onSubmit = (event: Event) => {
      event.preventDefault();
      console.log(1);
      validate();
    };
    // ctx.expose({ validate });
    useExpose<{ validate: validateFunc }>({ validate });
    return () => {
      return (
        <form class="ant-form" onSubmit={onSubmit}>
          {ctx.slots.default!()}
        </form>
      );
    };
  },
});
