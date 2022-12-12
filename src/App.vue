<template>
    <notifications position="top center" />
    <div v-focus tabindex="0" @keyup="pushKey" style="outline: none">
        <integradle-title></integradle-title>
        <div class="debug">
            <div>position {{ position }}</div>
            <div v-katex="previewExpression" class="preview" />
        </div>
        <div class="background"></div>
        <grid></grid>
        <div class="keyboard-container"><keyboard
            @push-character="(c) => pushCharacter(c)"
            @pop-character="(c) => popCharacter(c)"
            @submit="submit"
        /></div>
        
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
//import ExpCell from "./components/ExpressionCell.vue";
import Grid from "./components/Grid.vue";
import IntegradleTitle from "./components/IntegradleTitle.vue";
import Keyboard from "./components/Keyboard.vue";

@Options({
    components: {
        HelloWorld,
        Grid,
        IntegradleTitle,
        Keyboard,
    },
})
export default class App extends Vue {
    get position(): string {
        return (
            this.$store.state.currentRow + ":" + this.$store.state.currentColumn
        );
    }

    get previewExpression(): string {
        return this.$store.state.previewExpression;
    }

    pushKey(event: KeyboardEvent) {
        if (event.key == "Backspace") {
            // clear if ctrl key is pressed, otherwise backspace normally
            this.popCharacter(event.ctrlKey);
        } else if (event.key == "Enter") {
            this.submit();
        } else if (event.key == "ArrowLeft") {
            this.$store.commit("MOVE_LEFT");
        } else if (event.key == "ArrowRight") {
            this.$store.commit("MOVE_RIGHT");
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
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap");

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
    font-family: var(--sans-serif);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #00305f;
}
.keyboard-container{
    margin-top: 50px;
}
</style>
