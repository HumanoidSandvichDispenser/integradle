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
        throw new ExpressionError("Respect the +C");
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

export function randomLine(seed = "") {
    /*
    if (seed == "") {
        seed = new Date().toISOString().slice(0, 10) + "pepega";
    }
    */
    const antiderivative = randomPolynomial();
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

//
// Write a function that generates a random polynomial using the randomTerm() function above. Each term should have a unique exponent (so the polynomial does not have 5x^2 + 2x^2 for instance).
// Example:
// randomPolynomial() -> [ '5', 'x^2', '+', '2', 'x' ]
// randomPolynomial() -> [ '1', 'x^4', '+', '3', 'x^3', '+', '7', 'x^2', '+', '5', 'x' ]
// randomPolynomial() -> [ '2', 'x^3', '+', 'x^2', '+', '3', 'x' ]

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

export function randomPolynomial() {
    const term1 = randomTerm();
    const term2 = randomTerm();

    if (term1.exponent == term2.exponent) {
        // just to make sure we don't have the same exponent
        return [term1];
    }
    return [term1];
}
