import { Store } from "vuex"
import { IRootState } from "./store/types";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $store: Store<IRootState>
    }
}
