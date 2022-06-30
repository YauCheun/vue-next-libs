/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleItem, ValidateError } from "async-validator";

const FormItemKey = "FromItemKey";
const FormKey = "FromKey";
interface FormItemContent {
  id: string;
  prop: string;
  validate: (value: string) => Promise<boolean | ValidateError>;
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
  addItem: (item: Partial<FormItemContent>) => void;
  removeItem: (id: string) => void;
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
