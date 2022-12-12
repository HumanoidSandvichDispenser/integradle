import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vueKatex from "@hsorby/vue3-katex";
import "katex/dist/katex.min.css";
import notifications from "@kyvg/vue3-notification";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

createApp(App)
    .use(store)
    .use(BootstrapIcon)
    .use(vueKatex, {
        globalOptions: {
            throwOnError: false,
        },
    })
    .use(notifications)
    .mount("#app");
