import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vueKatex from "@hsorby/vue3-katex";
import "katex/dist/katex.min.css";

createApp(App).use(store).use(vueKatex).mount("#app");
