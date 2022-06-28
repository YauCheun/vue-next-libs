/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleItem, ValidateError } from "async-validator";

const FormItemKey = "FromItemKey";
const FormKey = "FromKey";
interface FormItemContent {
  handleControlChange(value: string): void;
  handleControlBlur(value: string): void;
}

type trigger = "change" | "blur";
interface AntRuleItem extends RuleItem {
  trigger?: trigger;
}
interface AntRuleForm {
  [key: string]: AntRuleItem[];
}
type validateFunc = (
  callback: (valid: boolean) => void
) => Promise<boolean | ValidateError>;
interface FormContent {
  model: Record<string, any>;
  rules: AntRuleForm;
  validate: validateFunc;
}

export {
  FormItemKey,
  FormItemContent,
  AntRuleItem,
  trigger,
  AntRuleForm,
  FormContent,
  FormKey,
  validateFunc,
};
