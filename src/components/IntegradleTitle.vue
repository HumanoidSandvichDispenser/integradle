<template>
    <div class="title">∫INTEGRADLE</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class IntegradleTitle extends Vue {}
</script>

<style>
div.title {
    letter-spacing: 4px;
    font-size: 24px;
    font-weight: 600;
}
</style>
