import { describe, expect, test } from "@jest/globals";
import Term from "./term";

describe("term module", () => {
    test("2x^3 should be represented as ['+', '2', 'x^3']", () => {
        let t: Term = new Term();
        t.coefficient = 2;
        t.exponent = 3;
        expect(t.toStringArray()).toStrictEqual(["+", "2", "x^3"]);
    });

    test("1x^0 should be represented as ['+', '1']", () => {
        let t: Term = new Term();
        t.coefficient = 1;
        t.exponent = 0;
        expect(t.toStringArray()).toStrictEqual(["+", "1"]);
    });

    test("derivative of 2x^3 should be 6x^2", () => {
        let t: Term = new Term();
        t.coefficient = 2;
        t.exponent = 3;
        let d = t.derivative();
        expect(d.coefficient).toBe(6);
        expect(d.exponent).toBe(2);
    });

    test("two polynomials should return correct string (from utils.ts)", () => {
        let t1: Term = new Term();
        t1.coefficient = 2;
        t1.exponent = 3;
        let t2: Term = new Term();
        t2.coefficient = 1;
        t2.exponent = 3;

        let eq: string[] = [];

        [ t1, t2 ].forEach((term, i) => {
            let arr = term.toStringArray();
            if (i == 0 && term.coefficient > 0) {
                arr = arr.slice(1);
            }
            eq = eq.concat(arr);
        });

        expect(eq[0]).toBe("2");
    });
});
