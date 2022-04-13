import { defineComponent } from "vue";

export default defineComponent({
  name: "AInput",
  props: {
    modelValue: {
      type: String,
      default: "",
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
            type="text"
            class="snow-field"
            placeholder={ctx.attrs.placeholder as string}
            value={props.modelValue}
            onInput={OnInput}
          />
        </div>
      );
    };
  },
});
