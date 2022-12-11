import { describe, expect, test } from "@jest/globals";
import { checkExpression, compareAntiderivative } from "./utils";
import nerdamer from "nerdamer";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";

describe("utils module", () => {
    test("expression should fail without equals", () => {
        let cells = ["2x", "x^2", "+", "C"];
        expect(() => {
            checkExpression(cells)
        }).toThrowError("Missing equals sign");
    });

    test("expression should fail without dx", () => {
        let cells = ["2x", "=", "x^2", "+", "C"];
        expect(() => {
            checkExpression(cells)
        }).toThrowError("Missing differential dx");
    });

    test("expression should fail without +C", () => {
        let cells = ["2x", "dx", "=", "x^2", "+"];
        expect(() => {
            checkExpression(cells)
        }).toThrowError("Respect the +C");
    });

    test("expression should fail if dx does not precede equals sign", () => {
        let cells = ["dx", "2x", "=", "x^2", "+", "C"];
        expect(() => {
            checkExpression(cells)
        }).toThrowError("dx must appear before the equals sign");
    });

    test("nerdamer should return correct antiderivative", () => {
        let exp = nerdamer("integrate(2x)");
        console.log(exp);
        console.log(exp.toTeX());
        expect(exp.eq("x^2")).toBe(true);
    });

    test("nerdamer should compare antiderivative and integrand", () => {
        expect(compareAntiderivative("2x", "x^2")).toBe(true);
    });

    test("expression should succeed if antiderivative is correct", () => {
        let cells = ["2x", "dx", "=", "x^2", "+", "C"];
        expect(checkExpression(cells)).toBe(true);
        cells = ["4x", "dx", "=", "2", "x^2", "+", "C"];
        expect(checkExpression(cells)).toBe(true);
        cells = ["4x", "-", "1", "dx", "=", "2", "x^2", "-", "x", "+", "C"];
        expect(checkExpression(cells)).toBe(true);
        cells = ["x", "dx", "=", "x", "+", "C"];
        expect(checkExpression(cells)).toBe(false);
    });
});
