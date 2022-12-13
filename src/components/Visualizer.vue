<template>
    <div class="visualizer">
        <!--textarea v-if="isFinished" v-model="content" readonly /-->
        <div v-for="(row, i) in content" :key="i">
            {{ row }}
        </div>
        <a href="#" @click="copy">
            <bootstrap-icon icon="clipboard" />
        </a>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import { checkCell } from "../utils";

export default class Visualizer extends Vue {
    get content() {
        const expr = this.$store.state.expressions;
        const ans = this.$store.state.answer;
        const arr = [];
        expr.forEach((row, rowIdx) => {
            if (rowIdx >= this.$store.state.currentRow) {
                return;
            }

            let str = "\u{01F7E9}";
            row.forEach((cell, cellIdx) => {
                let idx = checkCell(cell, cellIdx, ans);
                if (idx == -1) {
                    str += "\u2B1C";
                } else if (idx == cellIdx) {
                    str += "\u{01F7E9}";
                } else {
                    str += "\u{01F7E8}";
                }
            });
            arr.push(str);
        });
        arr.push("Integradle " + this.$store.state.currentRow + " / 7");
        return arr;
    }

    copy() {
        const clipboard = this.content.join("\n");
        console.log(clipboard);
        navigator.clipboard.writeText(clipboard);
    }
}
</script>

<style>
.visualizer {
    display: inline-block;
    max-width: 256px;
    outline: 1px solid var(--fg0);
    padding: 8px;
    margin: 8px;
}

.visualizer div {
    margin-bottom: 0;
}

.visualizer div:last-of-type {
    margin: 16px;
    display: inline;
}

.visualizer a {
    color: var(--fg0);
}
</style>
