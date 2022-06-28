import Input from "./components/Input/index";
import FormItem from "./components/From/FromItem";
import Form from "./components/From/index";
import { App } from "vue";

const components = [Input, FormItem, Form];

export default function (app: App) {
  components.forEach((item) => app.component(item.name, item));
}
