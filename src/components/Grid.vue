<template>
    <div class="grid">
        <row></row>
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
}
</script>

<style scoped></style>
