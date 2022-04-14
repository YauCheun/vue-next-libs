import { defineComponent } from "vue";

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
    const OnInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      if (value !== props.modelValue) {
        ctx.emit("update:modelValue", value);
      }
    };
    return () => {
      return (
        <div class="snow-field-wrap">
          <input
            class="snow-field"
            type={props.type}
            placeholder={ctx.attrs.placeholder as string}
            value={props.modelValue}
            onInput={OnInput}
          />
        </div>
      );
    };
  },
});
