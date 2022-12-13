import ExpressionError from "./expression-error";
import nerdamer from "nerdamer";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";
import Term from "./term";

export function getPreview(cells: string[]) {
    const integrandIndex = cells.indexOf("dx");
    if (integrandIndex > 0) {
        const integrand = cells.slice(0, integrandIndex).join(" ");
        const others = cells.slice(integrandIndex + 1).join(" ");
        return "\\int (" + integrand + ") dx" + others;
    } else {
        return "\\int " + cells.join(" ");
    }
}

export function checkExpression(cells: string[]) {
    // check if our expression is valid before submitting

    const emptyIndex = cells.indexOf("");
    if (emptyIndex >= 0) {
        throw new ExpressionError(`Cell ${emptyIndex + 1} is empty`);
    }

    const equalsIndex = cells.indexOf("=");
    if (equalsIndex < 0) {
        throw new ExpressionError("Missing equals sign");
    }

    const integrandIndex = cells.indexOf("dx");
    if (integrandIndex < 0) {
        throw new ExpressionError("Missing differential dx");
    }

    const constantIndex = cells.indexOf("C");
    if (constantIndex < 0) {
        throw new ExpressionError("Respect the +C you moron");
    }

    if (integrandIndex != equalsIndex - 1) {
        throw new ExpressionError("dx must appear before the equals sign");
    }

    let integrand = cells.slice(0, integrandIndex).join(" ");

    if (integrand == "") {
        integrand = "1";
    }

    const antiderivative = cells
        .slice(equalsIndex + 1, constantIndex - 1)
        .join(" ");

    return compareAntiderivative(integrand, antiderivative);
}

export function compareAntiderivative(
    integrand: string,
    antiderivative: string
) {
    const received = nerdamer(antiderivative);
    const expected = nerdamer(`integrate(${integrand})`);
    return expected.eq(received);
}

export function checkAnswer(cells: string[], answer: string[]): boolean {
    let hasFoundDiff = false;
    cells.forEach((cell, i) => {
        if (cells[i] != answer[i]) {
            hasFoundDiff = true;
        }
    });
    return !hasFoundDiff;
}

export function checkCell(cell: string, idx: number, row: string[]): number {
    if (cell == row[idx]) {
        return idx;
    }

    return row.indexOf(cell);
}

function hash(str: string) {
    let hash = 0;
    const len = str.length;
    for (let i = 0; i < len; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return hash;
}

function randomInteger(seed: string, max = 10) {
    return hash(hash(seed) + "pepega") % max;
}

export function randomLine(isHardmode = false) {
    const antiderivative = randomPolynomial(isHardmode);
    const integrand = antiderivative.map((term) => term.derivative());
    let antiderivativeStr: string[] = [];
    let integrandStr: string[] = [];

    antiderivative.forEach((term, i) => {
        let arr = term.toStringArray();
        if (i == 0 && term.coefficient > 0) {
            arr = arr.slice(1);
        }
        antiderivativeStr = antiderivativeStr.concat(arr);
    });

    integrand.forEach((term, i) => {
        let arr = term.toStringArray();
        if (i == 0 && term.coefficient > 0) {
            arr = arr.slice(1);
        }
        integrandStr = integrandStr.concat(arr);
    });

    return [...integrandStr, "dx", "=", ...antiderivativeStr, "+", "C"];
}

function pick(seed: string, arr: number[], amount: number) {
    const result = [];
    const copy = [...arr];
    for (let i = 0; i < amount; i++) {
        const index = randomInteger(seed, copy.length);
        result.push(copy[index]);
        copy.splice(index, 1);
    }
    return result;
}

function randomTerm(): Term {
    let coefficient = Math.floor(Math.random() * 9) + 1;
    if (Math.random() < 0.5) {
        coefficient *= -1;
    }
    const exponent = Math.floor(Math.random() * 9) + 1;
    const t: Term = new Term();
    t.coefficient = coefficient;
    t.exponent = exponent;
    return t;
}

export function randomPolynomial(isHardmode: boolean) {
    const term1 = randomTerm();
    const term2 = randomTerm();
    console.log("hardmode: " + isHardmode);

    if (isHardmode) {
        // just to make sure we don't have the same exponent
        if (term1.exponent == term2.exponent) {
            // move one of the exponents up or down
            if (term2.exponent > 3) {
                term2.exponent--;
            } else {
                term1.exponent++;
            }
        }

        // ensure the second term is LESS than the first term
        if (term2.exponent > term1.exponent) {
            const buf = term1.exponent;
            term1.exponent = term2.exponent;
            term2.exponent = buf;
        }

        return [term1, term2];
    }
    return [term1];
}
