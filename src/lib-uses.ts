import Input from "./components/Input/index";
import FormItem from "./components/From/FromItem";
import Form from "./components/From/index";
import Tabs from "./components/Tabs/index";
import TabPane from "./components/Tabs/tabpane";
import { App } from "vue";

const components = [Input, FormItem, Form, Tabs, TabPane];

export default function (app: App) {
  components.forEach((item) => app.component(item.name, item));
}
