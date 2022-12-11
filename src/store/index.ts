import { ActionContext, createStore, StoreOptions } from "vuex";
import { IRootState } from "./types";

const numberRegex = /^\d+$/;
const exponentRegex = /^.\^+\d*$/;
const variableRegex = /^[a-zA-Z]+$/;
const symbols = ["+", "-", "="];

const state = {
    answer: ["2", "x", "dx", "=", "x^2", "+", "C"],
    expressions: [
        //["x^2", "x^2", "+", "2", "x"],
        //["9", "+", "x", "-", "1"],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ],
    currentRow: 0,
    currentColumn: 0,
};

const getters = {
    currentExpression(state: IRootState) {
        return state.expressions[state.currentRow][state.currentColumn];
    },
};

const mutations = {
    SET_CURRENT_EXPRESSION(state: IRootState, exp: string) {
        state.expressions[state.currentRow][state.currentColumn] = exp;
    },
    SET_CURRENT_ROW(state: IRootState, row: number) {
        state.currentRow = row;
    },
    SET_CURRENT_COLUMN(state: IRootState, column: number) {
        state.currentColumn = column;
    },
    MOVE_RIGHT(state: IRootState) {
        const length = state.answer.length;
        let col = state.currentColumn;
        col = Math.min(Math.max(col + 1, 0), length - 1);
        state.currentColumn = col;
    },
    MOVE_LEFT(state: IRootState) {
        const length = state.answer.length;
        let col = state.currentColumn;
        col = Math.min(Math.max(col - 1, 0), length - 1);
        state.currentColumn = col;
    },
    MOVE_DOWN(state: IRootState) {
        state.currentRow++;
        state.currentColumn = 0;
    },
};

const actions = {
    PUSH_CHARACTER(
        context: ActionContext<IRootState, IRootState>,
        char: string
    ) {
        const currExp = getters.currentExpression(state);
        // if caret (for exponent)
        if (char == "^") {
            if (variableRegex.test(currExp)) {
                context.commit("SET_CURRENT_EXPRESSION", currExp + "^");
            }
        } else if (char == "d" || char == "dx") {
            if (currExp.length > 0) {
                context.commit("MOVE_RIGHT");
            }
            context.commit("SET_CURRENT_EXPRESSION", char);
        } else if (symbols.includes(char)) {
            if (!currExp.endsWith("^")) {
                // push plus/minus if we don't expect an exponent
                if (currExp.length > 0) {
                    // move to another cell if it is not empty
                    context.commit("MOVE_RIGHT");
                }
                context.commit("SET_CURRENT_EXPRESSION", char);
                context.commit("MOVE_RIGHT");
            }
        } else if (char == " ") {
            if (!currExp.endsWith("^")) {
                // move to the next cell if we don't expect an exponent
                context.commit("MOVE_RIGHT");
            }
        } else if (numberRegex.test(currExp)) {
            if (numberRegex.test(char)) {
                context.commit("SET_CURRENT_EXPRESSION", currExp + char);
            } else {
                // if we are appending a non-number, just shift to the right
                context.commit("MOVE_RIGHT");
                context.commit("SET_CURRENT_EXPRESSION", char);
            }
        } else {
            if (exponentRegex.test(currExp)) {
                // only append numbers to exponents
                if (numberRegex.test(char)) {
                    context.commit("SET_CURRENT_EXPRESSION", currExp + char);
                }
            } else {
                // only append letters to variables
                if (numberRegex.test(char)) {
                    if (currExp.length == 0) {
                        context.commit(
                            "SET_CURRENT_EXPRESSION",
                            currExp + char
                        );
                    }
                } else {
                    context.commit("SET_CURRENT_EXPRESSION", currExp + char);
                }
            }
        }
    },
    POP_CHARACTER(
        context: ActionContext<IRootState, IRootState>,
        clear: boolean
    ) {
        let currExp = getters.currentExpression(state);
        if (currExp.length <= 0) {
            context.commit("MOVE_LEFT");
            // update current expression
            currExp = getters.currentExpression(state);
        }

        let newExp = currExp.slice(0, -1);

        if (clear) {
            newExp = "";
        }

        context.commit("SET_CURRENT_EXPRESSION", newExp);
    },
    SUBMIT(context: ActionContext<IRootState, IRootState>) {
        // we can only submit if we are on the last column, and it is not empty
        const currExp = getters.currentExpression(state);
        if (state.currentColumn == state.answer.length - 1) {
            if (currExp.length > 0) {
                context.commit("MOVE_DOWN");
            }
        }
    },
};

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {},
} as StoreOptions<IRootState>);
