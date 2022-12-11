<template>
    <div class="row">
        <div class="integral" v-katex:auto>\( \int \)</div>
        <expression-cell
            v-for="(_, i) in expressions[rowIndex]"
            :key="i"
            :row-index="rowIndex"
            :column-index="i"
            :is-input="isInput"
            :is-history="isHistory"
        />
    </div>
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
    display: table-row;
}
</style>
