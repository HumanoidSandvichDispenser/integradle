import ExpressionError from "./expression-error";
import nerdamer from "nerdamer";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";

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

function randomInteger(seed: string) {
    return hash(hash(seed) + "pepega") % 10;
}

export function randomLine(seed = "") {
    if (seed == "") {
        seed = new Date().toISOString().slice(0, 10) + "pepega";
    }
    const antiderivative = randomPolynomial(seed);
}

function derivative(expression: string[]): string[] {

}

export function randomPolynomial(seed: string) {
    let terms: string[] = [];
    let digits: number[] = [];
    for (let i = 0; i < 12; i++) {
        //
    }
    /*
    let terms: string[] = [];

    // generate a series of 12 random digits
    let digits: number[] = [];
    for (let i = 0; i < 12; i++) {
        digits.push(randomInteger(seed + i));
    }

    for (let i = 0; i < 9; i++) {

    }

    for (let i = 0; i < 3; i++) {
        // split the 12 characters into three 4-digit hashes
        let term: string[];
        let first = digits[i * 4];
        let second = digits[i * 4 + 1];
        let third = digits[i * 4 + 2];
        let fourth = digits[i * 4 + 3];

        // if the first digit is positive, then the second digit will be the
        // coefficient (a coefficient of 0 means no terms)
        if (first > 0 && second != 0) {
            if (second < 0) {
                second = -second;
                polynomial.push("-");
                term[]
            } else if (i > 0)
            polynomial.push(second);
        }

        // if the third digit is positive, then the fourth digit will be the
        // exponent, as long as the third digit < A
    }

    // if no terms were generated (first digit was always negative or second
    // was always zero) then we generate our own
    */
}
