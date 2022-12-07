<template>
    <div class="grid">
        <div class="row">
            <expression-cell is-input>\(\int\)</expression-cell>
            <expression-cell is-input>\(10\)</expression-cell>
            <expression-cell is-input>\(x^4\)</expression-cell>
            <expression-cell is-input>\(dx\)</expression-cell>
            <expression-cell is-input>\(=\)</expression-cell>
            <expression-cell is-input>\(2\)</expression-cell>
            <expression-cell is-input>\(x^5\)</expression-cell>
            <expression-cell is-input>\(+\)</expression-cell>
            <expression-cell is-input>\(C\)</expression-cell>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ExpressionCell from "./ExpressionCell.vue";

@Options({
    components: {
        ExpressionCell,
    },
})
export default class Grid extends Vue {
    cells = [];
}
</script>

<style scoped></style>
