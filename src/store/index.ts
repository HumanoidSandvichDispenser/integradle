import ExpressionError from "../expression-error";
import { checkAnswer, checkExpression, getPreview, randomLine } from "../utils";
import { ActionContext, createStore, StoreOptions } from "vuex";
import { IRootState } from "./types";
import { notify } from "@kyvg/vue3-notification";

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
    previewExpression: "",
    currentRow: 0,
    currentColumn: 0,
    isHardmode: false,
    isFinished: false,
};

export const getters = {
    currentExpression(state: IRootState) {
        return state.expressions[state.currentRow][state.currentColumn];
    },
    nextExpression(state: IRootState) {
        return state.expressions[state.currentRow][state.currentColumn + 1];
    },
    currentLine(state: IRootState) {
        return state.expressions[state.currentRow];
    },
};

export const mutations = {
    NEW_PUZZLE(state: IRootState, isHardmode = false) {
        state.answer = randomLine(isHardmode);
        state.expressions.length = 0;
        // old behavior: number of rows depends on number of columns
        // new behavior 2022-12-12: all puzzles will have 7 rows
        // this is because more columns can give more clues which makes it easy
        for (let i = 0; i < 7; i++) {
            const blank = Array(state.answer.length).fill("");
            state.expressions.push(blank);
        }
        state.currentColumn = 0;
        state.currentRow = 0;
        state.previewExpression = "";
        state.isHardmode = isHardmode;
        state.isFinished = false;
        console.log(state.answer);
    },
    SET_CURRENT_EXPRESSION(state: IRootState, exp: string) {
        if (state.isFinished) {
            return;
        }

        const row = state.expressions[state.currentRow];
        row[state.currentColumn] = exp;

        // update expressions
        state.previewExpression = getPreview(row);
        console.log(state.previewExpression);
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
        if (checkAnswer(getters.currentLine(state), state.answer)) {
            const lines = state.currentRow + 1;
            notify({
                title: `Finished in ${lines} move(s)`,
                type: "success",
                duration: 8000,
            });
            state.isFinished = true;
        }
        state.currentRow++;
        state.currentColumn = 0;
        state.previewExpression = "\\int";
    },
};

export const actions = {
    PUSH_CHARACTER(
        context: ActionContext<IRootState, IRootState>,
        char: string
    ) {
        let currExp = getters.currentExpression(state);
        const nextExp = getters.nextExpression(state);
        if (nextExp != undefined && nextExp != "") {
            // there is another expression after the current one
            // so we should clear the current cell before typing
            //context.commit("SET_CURRENT_EXPRESSION", "");
            currExp = getters.currentExpression(state);
        }

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
                    context.commit("MOVE_RIGHT");
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

        // if the expression we submitted is valid, then move to next line
        if (currExp.length > 0) {
            try {
                if (checkExpression(getters.currentLine(state))) {
                    context.commit("MOVE_DOWN");
                } else {
                    console.log("invalid expr");
                    notify({
                        title: "Invalid expression",
                        type: "error",
                        text:
                            "Your integrand should evaluate to your " +
                            "antiderivative (i.e. it should be a true " +
                            "statement)",
                    });
                }
            } catch (err) {
                if (err instanceof ExpressionError) {
                    notify({
                        title: "Invalid expression",
                        type: "error",
                        text: err.message,
                    });
                } else if (err instanceof Error) {
                    if (err.name != "ParseError") {
                        throw err;
                    }
                    notify({
                        title: "Parsing error",
                        type: "error",
                        text:
                            "Your expression may have invalid syntax - " +
                            err.message,
                    });
                }
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
