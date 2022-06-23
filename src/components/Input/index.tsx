import { defineComponent, inject } from "vue";
import "./index.scss";
import { FormItemKey, FormItemContent } from "../From/types";
export default defineComponent({
  name: "AInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    type: {
      validator: (value: string) => {
        // 这个值必须与下列字符串中的其中一个相匹配
        return ["text", "password", "textarea", "number"].includes(value);
      },
      default: "text",
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const FormItemCtx = inject<FormItemContent>(FormItemKey);
    const OnInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      if (value !== props.modelValue) {
        ctx.emit("update:modelValue", value);
        FormItemCtx?.handleControlChange(value);
      }
    };
    const OnBlur = () => {
      FormItemCtx?.handleControlBlur(props.modelValue);
    };
    return () => {
      return (
        <div class="ant-field-wrap">
          <input
            class="ant-field"
            type={props.type}
            placeholder={ctx.attrs.placeholder as string}
            value={props.modelValue}
            onInput={OnInput}
            onBlur={OnBlur}
          />
        </div>
      );
    };
  },
});
