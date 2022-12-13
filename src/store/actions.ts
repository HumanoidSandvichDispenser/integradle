import ExpressionError from "../expression-error";
import { checkExpression } from "../utils";
import { ActionContext } from "vuex";
import { IRootState } from "./types";
import { notify } from "@kyvg/vue3-notification";
import getters from "./getters";

const numberRegex = /^\d+$/;
const exponentRegex = /^.\^+\d*$/;
const variableRegex = /^[a-zA-Z]+$/;
const symbols = ["+", "-", "="];

const actions = {
    PUSH_CHARACTER(
        context: ActionContext<IRootState, IRootState>,
        char: string
    ) {
        const state = context.state;
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
        const state = context.state;
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
        const state = context.state;

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

export default actions;
