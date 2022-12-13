import { createStore, StoreOptions } from "vuex";
import { IRootState } from "./types";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const state = {
    answer: ["2", "x", "dx", "=", "x^2", "+", "C"],
    expressions: [],
    previewExpression: "",
    currentRow: 0,
    currentColumn: 0,
    isHardmode: false,
    isFinished: false,
    theme: "light",
};

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {},
} as StoreOptions<IRootState>);
