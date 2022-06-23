import { RuleItem } from "async-validator";

const FormItemKey = "FromItemKey";
interface FormItemContent {
  handleControlChange(value: string): void;
  handleControlBlur(value: string): void;
}
type trigger = "change" | "blur";
interface AntRuleItem extends RuleItem {
  trigger?: trigger;
}
export { FormItemKey, FormItemContent, AntRuleItem, trigger };
