import { defineComponent, ref, provide, PropType, inject } from "vue";
import Schema, { RuleItem, ValidateError } from "async-validator";
import {
  AntRuleItem,
  FormItemKey,
  trigger,
  FormContent,
  FormKey,
} from "./types";
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
    prop: {
      type: String,
      default: "",
    },
    rules: [Object, Array] as PropType<AntRuleItem | AntRuleItem[]>,
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const errMsg = ref("");
    const parent = inject<FormContent>(FormKey);
    const getRules = (trigger: trigger): AntRuleItem[] => {
      const rules = props.rules || parent?.rules[props.prop];
      if (rules) {
        const rulesArr = Array.isArray(rules) ? rules : [rules];
        const trueRules = rulesArr.filter((item) => {
          const Trigger = item?.trigger || "change";
          return Trigger !== trigger;
        });
        return trueRules;
      }
      return [];
    };
    const validate = (
      value: string,
      trueRule: AntRuleItem[]
    ): Promise<boolean | ValidateError> => {
      // console.log(rules);
      if (trueRule && props.prop) {
        const schema = new Schema({ [props.prop]: trueRule });
        return schema
          .validate({ [props.prop]: value })
          .then(() => {
            errMsg.value = "";
            return true;
          })
          .catch(({ errors }) => {
            errMsg.value = errors[0].message;
            return errors;
          });
      }
      return Promise.resolve(true);
    };
    const handleControlChange = (value: string) => {
      const trueRule = getRules("change");
      if (trueRule) {
        validate(value, trueRule);
      }
      console.log(value);
    };
    const handleControlBlur = (value: string) => {
      const trueRule = getRules("blur");
      if (trueRule) {
        validate(value, trueRule);
      }
    };
    provide(FormItemKey, {
      handleControlChange,
      handleControlBlur,
    });
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
