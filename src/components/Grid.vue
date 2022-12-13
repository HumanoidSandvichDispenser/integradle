<template>
    <div class="grid-container">
        <div class="grid">
            <row v-for="(_, i) in expressions" :key="i" :row-index="i"></row>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Row from "./Row.vue";

@Options({
    components: {
        Row,
    },
    props: {
        currentRowIndex: Number,
    },
})
export default class Grid extends Vue {
    rows = [];
    currentRowIndex!: number;

    get expressions(): string[][] {
        return this.$store.state.expressions;
    }
}
</script>

<style scoped>
.grid-container {
    display: inline-block;
    overflow-x: auto;
    max-width: 100%;
    padding: 4px;
}

.grid {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}
</style>
