import { createStore, StoreOptions } from "vuex";
import { IRootState } from "./types";

export default createStore({
    state: {
        currentExpression: ["9", "x^2", "+", "2", "x"],
    },
    mutations: {},
    actions: {},
    modules: {},
} as StoreOptions<IRootState>);
