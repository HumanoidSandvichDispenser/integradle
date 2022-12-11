import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vueKatex from "@hsorby/vue3-katex";
import "katex/dist/katex.min.css";
import notifications from "@kyvg/vue3-notification";

createApp(App)
    .use(store)
    .use(vueKatex, {
        globalOptions: {
            throwOnError: false,
        },
    })
    .use(notifications)
    .mount("#app");
