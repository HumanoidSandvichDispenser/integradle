<template>
    <div v-focus tabindex="0" @keyup="pushKey">
        <integradle-title></integradle-title>
        <div class="debug">
            <div>position {{ position }}</div>
        </div>
        <div class="background"></div>
        <grid></grid>
        <button @click="pushCharacter('^')">x<sup>n</sup></button>
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
        <button @click="popCharacter(true)">CLEAR</button>
        <button @click="submit()">SUBMIT</button>
        <input />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
//import ExpCell from "./components/ExpressionCell.vue";
import Grid from "./components/Grid.vue";
import IntegradleTitle from "./components/IntegradleTitle.vue";

@Options({
    components: {
        HelloWorld,
        Grid,
        IntegradleTitle,
    },
})
export default class App extends Vue {
    get position(): string {
        return (
            this.$store.state.currentRow + ":" + this.$store.state.currentColumn
        );
    }

    pushKey(event: KeyboardEvent) {
        if (event.key == "Backspace") {
            // clear if ctrl key is pressed, otherwise backspace normally
            this.popCharacter(event.ctrlKey);
        } else if (event.key == "Enter") {
            this.submit();
        } else if (event.key.length == 1) {
            this.pushCharacter(event.key);
        } else {
            console.log(event.key);
        }
    }

    pushCharacter(char: string) {
        this.$store.dispatch("PUSH_CHARACTER", char);
    }

    popCharacter(clear = false) {
        this.$store.dispatch("POP_CHARACTER", clear);
    }

    submit() {
        this.$store.dispatch("SUBMIT");
    }
}
</script>

<style>
:root {
    --red: #e06c75;
    --yellow: #e5c07b;
    --green: #98c379;
    --blue: #61afef;
    --cyan: #56b6c2;
    --purple: #c678dd;
    --accent: #61afef;
    --bg0: #ffffff;
    --bg1: #ededed;
    --bg2: #dadada;
    --bg3: #afafaf;
    --fg0: #3a494e;
    --fg1: #4d6066;
    --fg2: #607880;
    --fg3: #98aab3;
    --accent: #538d4e;
    --sans-serif: "Source Sans 3", "Arial", sans-serif;
    --monospace: "JetBrains Mono", "Courier", monospace;
    --serif: "Merriweather", serif;
    --display: "Bree Serif", var(--serif);
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #00305f;
}

body {
    /*background-color: rgb(63, 63, 63);
    animation: rgb 4s infinite;
}

@keyframes rgb {
    0% {
        background-color: rgb(39, 39, 39);
    }
    50% {
        background-color: rgb(83, 83, 83);
    }
    100% {
        background-color: rgb(39, 39, 39);
    }*/
}
</style>
