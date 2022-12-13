import { IRootState } from "./types";

const getters = {
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

export default getters;
