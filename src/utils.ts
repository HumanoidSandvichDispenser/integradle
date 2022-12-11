import ExpressionError from "./expression-error";
import nerdamer from "nerdamer";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";

export function checkExpression(cells: string[]) {
    // check if our expression is valid
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
    let antiderivative = cells
        .slice(equalsIndex + 1, constantIndex - 1)
        .join(" ");
    return compareAntiderivative(integrand, antiderivative);
}

export function compareAntiderivative(integrand: string, antiderivative: string) {
    let received = nerdamer(antiderivative);
    let expected = nerdamer(`integrate(${integrand})`);
    console.log(received);
    console.log(expected);
    return expected.eq(received);
}
