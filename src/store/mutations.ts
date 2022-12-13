import { checkAnswer, getPreview, randomLine } from "../utils";
import { IRootState } from "./types";
import { notify } from "@kyvg/vue3-notification";
import getters from "./getters";

const mutations = {
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
    SET_THEME(state: IRootState, theme: string) {
        state.theme = theme;
    },
};

export default mutations;
