import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/index.scss";
import libUse from "./lib-uses";
createApp(App).use(libUse).mount("#app");
