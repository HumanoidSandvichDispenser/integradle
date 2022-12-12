<template>
    <div class="title">
        <div class="letters">
            <span>I</span>
            <span>N</span>
            <span>T</span>
            <span>E</span>
            <span>G</span>
            <span>R</span>
            <span>A</span>
            <span>D</span>
            <span>L</span>
            <span>E</span>
        </div>
        <div class="subtitle">
            A daily math game
        </div>
    </div>
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

div.title > .letters > span {
    display: inline-block;
    height: 32px;
    width: 32px;
    font-size: 24px;
    font-weight: 600;
    background-color: var(--green);
    color: var(--bg0);
    margin: 4px;
    text-align: center;
    line-height: 32px;
    letter-spacing: 0;
}

div.title > .subtitle {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
}
</style>
