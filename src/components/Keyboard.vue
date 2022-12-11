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
        <button @click="$emit('pushCharacter', '1')">1</button>
        <button @click="$emit('pushCharacter', '2')">2</button>
        <button @click="$emit('pushCharacter', '3')">3</button>
    </div>
    <div class="keyboard-row">
        <button @click="$emit('pushCharacter', '4')">4</button>
        <button @click="$emit('pushCharacter', '5')">5</button>
        <button @click="$emit('pushCharacter', '6')">6</button>
    </div>
    <div class="keyboard-row">
        <button @click="$emit('pushCharacter', '7')">7</button>
        <button @click="$emit('pushCharacter', '8')">8</button>
        <button @click="$emit('pushCharacter', '9')">9</button>
    </div>
    <div class="keyboard-row">
        <button @click="$emit('pushCharacter', '+')">+</button>
        <button @click="$emit('pushCharacter', '0')">0</button>
        <button @click="$emit('pushCharacter', '-')">-</button>
    </div>
    <div class="keyboard-row">
        <button @click="$emit('pushCharacter', 'x')">x</button>
        <button @click="$emit('pushCharacter', '^')">x<sup>n</sup></button>
        <button @click="$emit('pushCharacter', 'C')">C</button>
        <button @click="$emit('pushCharacter', 'dx')">dx</button>
        <button @click="$emit('pushCharacter', '=')">=</button>
    </div>
    <button @click="$emit('popCharacter')">DELETE</button>
    <button @click="$emit('popCharacter', true)">CLEAR CELL</button>
    <button @click="$emit('submit')">SUBMIT</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Keyboard extends Vue {}
</script>

<style></style>
