import { defineComponent, ref } from "vue";
import "./index.scss";
export default defineComponent({
  name: "AFormItem",
  props: {
    // modelValue: {
    //   type: String,
    //   default: "",
    // },
    label: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const errMsg = ref("");
    const renderLabel = () => {
      return ctx.slots.label ? (
        ctx.slots.label()
      ) : (
        <label class="item-label">{props.label}</label>
      );
    };
    return () => {
      return (
        <div class="ant-form-item">
          {renderLabel()}
          <div class="item-content">
            <div class="item-control-wrap">{ctx.slots.default!()}</div>
            <p class="item-error" v-show="errMsg.value">
              {errMsg.value}
            </p>
          </div>
        </div>
      );
    };
  },
});
