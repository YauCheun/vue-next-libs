import {
  defineComponent,
  ref,
  provide,
  PropType,
  inject,
  onMounted,
  onUnmounted,
} from "vue";
import Schema, { RuleItem, ValidateError } from "async-validator";
import {
  AntRuleItem,
  FormItemKey,
  trigger,
  FormContent,
  FormKey,
  FormItemContent,
} from "./types";
import "./index.scss";
let id = 0;
function generateId(): string {
  return "form-item-" + id++;
}
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
    const current = generateId();
    const errMsg = ref("");
    const parent = inject<FormContent>(FormKey);
    onMounted(() => {
      parent?.addItem({
        id: current,
        prop: props.prop,
        validate,
      });
    });
    onUnmounted(() => {
      parent?.removeItem(current);
    });
    const getRules = (trigger?: trigger): AntRuleItem[] => {
      const rules = props.rules || parent?.rules[props.prop];
      if (rules) {
        const rulesArr = Array.isArray(rules) ? rules : [rules];
        if (trigger) {
          const trueRules = rulesArr.filter((item) => {
            const Trigger = item?.trigger || "change";
            return Trigger !== trigger;
          });
          return trueRules;
        }
        return rulesArr;
      }
      return [];
    };
    const validate = (
      value: string,
      rules?: AntRuleItem[]
    ): Promise<boolean | ValidateError> => {
      // console.log(rules);
      const trueRule = rules || getRules();
      if (trueRule.length && props.prop) {
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
    provide<Partial<FormItemContent>>(FormItemKey, {
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
