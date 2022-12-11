<template>
    <div class="row">
        <div class="cell history correct integral" v-katex:auto>\( \int \)</div>
        <div v-for="(_, i) in expressions[rowIndex]" :key="i">
            <expression-cell
                :row-index="rowIndex"
                :column-index="i"
                :is-input="isInput"
                :is-history="isHistory"
            />
        </div>
    </div>
    <!--div v-if="isInput" v-katex="previewExpression" class="preview" /-->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ExpressionCell from "./ExpressionCell.vue";

@Options({
    components: {
        ExpressionCell,
    },
    props: {
        rowIndex: Number,
        currentIndex: Number,
    },
})
export default class Row extends Vue {
    cells = [];
    rowIndex!: number;
    currentIndex!: number;

    get previewExpression(): string {
        return "\\rightarrow" + this.$store.state.previewExpression;
    }

    get expressions(): string[][] {
        return this.$store.state.expressions;
    }

    get isInput(): boolean {
        return this.$store.state.currentRow == this.rowIndex;
    }

    get isHistory(): boolean {
        return this.$store.state.currentRow > this.rowIndex;
    }
}
</script>

<style scoped>
.row {
    display: flex;
    margin: 0 auto;
    justify-content: center;
}

.row.shake {
    animation: shake 0.5s ease;
    transform: translate3d(0);
}

@keyframes shake {
    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}

.preview {
    position: absolute;
    height: 48px;
    display: inline;
    text-align: left;
    line-height: 48px;
    margin: 4px;
    overflow: hidden;
}
</style>
