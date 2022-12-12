<template>
    <!--button @click="pushCharacter('^')">x<sup>n</sup></button>
    <button @click="pushCharacter('x')">x</button>
    <button @click="pushCharacter('dx')">dx</button>
    <button @click="pushCharacter('C')">C</button>
    <button @click="pushCharacter('1')">1</button>
    <button @click="pushCharacter('2')">2</button>
    <button @click="pushCharacter('3')">3</button>
    <button @click="pushCharacter('+')">+</button>
    <button @click="pushCharacter('-')">-</button>
    <button @click="pushCharacter('=')">=</button>
    <button @click="popCharacter()">DELETE</button>
    <button @click="popCharacter(true)">CLEAR CELL</button>
    <button @click="submit()">SUBMIT</button-->
    <div class="keyboard-row">
        <button @click="$emit('pushCharacter', 'x')">x</button>
        <button class="number" @click="$emit('pushCharacter', '1')">1</button>
        <button class="number" @click="$emit('pushCharacter', '2')">2</button>
        <button class="number" @click="$emit('pushCharacter', '3')">3</button>
    </div>
    <div class="keyboard-row">
        <button @click="$emit('pushCharacter', 'dx')">dx</button>
        <button class="number" @click="$emit('pushCharacter', '4')">4</button>
        <button class="number" @click="$emit('pushCharacter', '5')">5</button>
        <button class="number" @click="$emit('pushCharacter', '6')">6</button>
    </div>
    <div class="keyboard-row">
        <button @click="$emit('pushCharacter', 'C')">C</button>
        <button class="number" @click="$emit('pushCharacter', '7')">7</button>
        <button class="number" @click="$emit('pushCharacter', '8')">8</button>
        <button class="number" @click="$emit('pushCharacter', '9')">9</button>
    </div>
    <div class="keyboard-row">
        <button @click="$emit('pushCharacter', '+')">+</button>
        <button @click="$emit('pushCharacter', '-')">-</button>
        <button class="number" @click="$emit('pushCharacter', '0')">0</button>
        <button @click="$emit('pushCharacter', '^')">x^n</button>
    </div>
    <div class="keyboard-row">
        <button @click="$emit('popCharacter', true)">CE</button>
        <button @click="$emit('popCharacter')">DEL</button>
        <button @click="$emit('submit')">SUB</button>
        <button @click="$emit('pushCharacter', '=')">=</button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Keyboard extends Vue {}
</script>

<style>
.keyboard-row button {
    /*border: 2px solid var(--fg0);*/
    border: none;
    width: 48px;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    padding: 0;
    height: 50px;
    cursor: pointer;
    background-color: var(--bg2);
    color: var(--fg0);
    flex-grow: 1;
    margin-right: 6px;
    margin-top: 6px;
    border-radius: 4px;
    position: sticky;
    top: 32px;
    bottom: 32px;
}

.keyboard-row button.number {
    background-color: var(--bg1);
}

.keyboard-row button:hover {
    background-color: var(--fg0);
    color: var(--bg0);
    transform: scale(1.05);
    transition-duration: 0.5s;
}
</style>
