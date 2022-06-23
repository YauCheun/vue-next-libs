import Input from "./components/Input/index";
import FormItem from "./components/From/FromItem";
import { App } from "vue";

const components = [Input, FormItem];

export default function (app: App) {
  components.forEach((item) => app.component(item.name, item));
}
