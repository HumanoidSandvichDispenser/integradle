<template>
    <div class="row">
        <expression-cell v-for="(cell, i) in currentExpression" :key="i">
            \({{ cell }}\)
        </expression-cell>
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
        currentIndex: Number,
    },
})
export default class Row extends Vue {
    cells = [];
    currentIndex!: number;

    get currentExpression(): string[] {
        return this.$store.state.currentExpression;
    }
}
</script>

<style scoped></style>
