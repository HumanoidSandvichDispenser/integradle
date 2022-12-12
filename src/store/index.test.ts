import { describe, expect, test } from "@jest/globals";
import { ActionContext } from "vuex";
import { actions, mutations } from ".";
import { IRootState } from "./types";

describe("index module", () => {
    test("MOVE_RIGHT should move to the next cell", () => {
        let state: IRootState = {
            answer: ["", ""],
            expressions: [],
            previewExpression: "",
            currentRow: 0,
            currentColumn: 0,
            isHardmode: false,
            isFinished: false,
        };
        mutations.MOVE_RIGHT(state);
        expect(state.currentColumn).toBe(1);
    });

    test("MOVE_LEFT should move to the previous cell", () => {
        let state: IRootState = {
            answer: ["", ""],
            expressions: [],
            previewExpression: "",
            currentRow: 0,
            currentColumn: 1,
            isHardmode: false,
            isFinished: false,
        };
        mutations.MOVE_LEFT(state);
        expect(state.currentColumn).toBe(0);
    });
});
