export default class Term {
    coefficient = 1;
    variable = "x";
    exponent = 0;

    toStringArray(): string[] {
        const res: string[] = [];

        let coeff = this.coefficient;
        if (coeff < 0) {
            coeff *= -1;
            res.push("-");
        } else {
            res.push("+");
        }

        if (coeff > 1) {
            res.push(coeff.toString());
        }

        if (this.exponent > 0) {
            let variable = this.variable;
            if (this.exponent > 1) {
                variable += "^" + this.exponent;
            }
            res.push(variable);
        } else if (this.coefficient == 1) {
            res.push(this.coefficient.toString());
        }
        return res;
    }

    derivative(): Term {
        const t = new Term();
        t.coefficient = this.coefficient * this.exponent;
        t.exponent = this.exponent - 1;
        t.variable = this.variable;
        return t;
    }
}
