<template>
    <div :class="isInput ? 'cell input' : 'cell'">
        <div class="cell-katex" v-katex:auto>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        isInput: Boolean,
    },
})
export default class ExpressionClass extends Vue {
    isInput!: boolean;
}
</script>

<style scoped>
.cell {
    /*display: inline-block;*/
    display: table-cell;
    background-color: var(--bg1);
    color: var(--fg0);
    height: 64px;
    width: 64px;
<<<<<<< HEAD
    border-radius: 8px;
    margin: 8px;
=======
    border-radius: 4px;
    align-items: center;
    text-align: center;
    margin: 4px;
>>>>>>> 612ec21140735b41b6647a533b8f1b5f78fda625
}

.cell.input {
    background-color: var(--bg0);
    outline: 1px solid var(--fg0);
}

.cell.done {
    background-color: var(--accent);
    font-weight: 700;
    color: white;
}

.cell .cell-katex {
    line-height: 64px;
}
</style>
