<template>
    <div class="cell-container">
        <div :class="cellClass">
            <!--div
                class="cell-katex"
                v-katex="{
                    expression: vari,
                    options: {
                        throwOnError: false,
                    },
                }"
            ></div-->
            <!--katex-element expression="" /-->
            <div class="cell-katex" v-katex="expression"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { KatexElement } from "@hsorby/vue3-katex";

@Options({
    props: {
        isInput: Boolean,
        isHistory: Boolean,
        rowIndex: Number,
        columnIndex: Number,
    },
    components: {
        KatexElement,
    },
})
export default class ExpressionClass extends Vue {
    isInput!: boolean;
    isHistory!: boolean;
    rowIndex!: number;
    columnIndex!: number;

    get cellClass(): string {
        let classes = ["cell"];
        if (this.isFocused) {
            classes.push("focused");
        } else if (this.isHistory) {
            classes.push("history");
            let guess = this.guess;
            if (guess != "") {
                classes.push(guess);
            }
        }
        return classes.join(" ");
    }

    get isFocused() {
        let currentRow = this.$store.state.currentRow;
        let currentColumn = this.$store.state.currentColumn;
        return currentRow == this.rowIndex && currentColumn == this.columnIndex;
    }

    get currentRow() {
        return this.$store.state.currentRow;
    }

    get guess(): string {
        let exp = this.expression;
        let ans = this.$store.state.answer;

        if (ans[this.columnIndex] == exp) {
            return "correct";
        }

        if (ans.indexOf(exp) > 0) {
            return "wrong-position";
        }

        return "";
    }

    get expressions(): string[][] {
        return this.$store.state.expressions;
    }

    get expression(): string {
        let expressions = this.$store.state.expressions;
        return expressions[this.rowIndex][this.columnIndex];
    }

    get isCurrentColumn(): boolean {
        return this.columnIndex == this.$store.state.currentColumn;
    }
}
</script>

<style>
.cell,
.integral {
    display: inline-block;
    height: 48px;
    width: 48px;
    color: var(--fg0);
    text-align: center;
    line-height: 48px;
    vertical-align: middle;
    margin: 4px;
}

.cell {
    border-radius: 4px;
    text-align: center;
    outline: 1px solid var(--bg3);
    vertical-align: middle;
}

.cell-katex {
    vertical-align: middle;
}

.cell.history {
    background-color: var(--bg3);
    outline: none;
    transition-duration: 1000ms;
    color: var(--bg0);
}

.cell.history.correct {
    background-color: var(--green);
}

.cell.history.wrong-position {
    background-color: var(--yellow);
}

.cell.input {
    background-color: var(--bg1);
    outline: 1px solid var(--bg3);
    transition-duration: 500ms;
}

.cell.focused {
    outline: 2px solid var(--fg0);
}

.cell.done {
    background-color: var(--accent);
    font-weight: 700;
    color: white;
}
</style>
