<template>
    <div id="top"></div>
    <notifications position="top center" />
    <div v-focus tabindex="0" @keyup="pushKey" style="outline: none">
        <div class="title-container">
            <integradle-title></integradle-title>
        </div>
        <div class="links">
            <a
                href="https://github.com/humanoidsandvichdispenser/integradle"
                tooltip="GitHub homepage"
            >
                <bootstrap-icon icon="github" />
            </a>
            <a href="https://sandvich.xyz/tools/integradle/" tooltip="Comments">
                <bootstrap-icon icon="chat-dots-fill" />
            </a>
            <a
                href="#"
                @click="
                    newPuzzle(false);
                    $event.target.blur();
                "
                tooltip="New puzzle with 1 term"
            >
                <bootstrap-icon icon="dice-1-fill" />
            </a>
            <a
                id="hardmode-icon"
                href="#"
                @click="
                    newPuzzle(true);
                    $event.target.blur();
                "
                tooltip="New puzzle with 2 terms ✌️💿"
            >
                <bootstrap-icon icon="dice-2-fill" />
            </a>
            <a
                id="darkmode-icon"
                href="#"
                @click="toggleDarkMode()"
                tooltip="Toggle light/dark"
            >
                <bootstrap-icon v-if="theme == 'light'" icon="sun-fill" />
                <bootstrap-icon v-else icon="moon-fill" />
            </a>
        </div>
        <visualizer v-if="isFinished" />
        <div v-else class="display">
            <div v-katex:display="previewExpression" class="preview" />
        </div>
        <div class="background"></div>
        <grid></grid>
        <div :class="{ 'keyboard-container': true, 'kb-open': isKBOpen }">
            <div @click.stop>
                <div class="keyboard-header" @click="isKBOpen = !isKBOpen">
                    <span v-if="isKBOpen">
                        <bootstrap-icon icon="x-lg" />
                        Collapse keyboard
                    </span>
                    <span v-else>
                        <bootstrap-icon icon="pin-angle-fill" />
                        Pin keyboard
                    </span>
                </div>
                <keyboard
                    @push-character="(c) => pushCharacter(c)"
                    @pop-character="(c) => popCharacter(c)"
                    @submit="submit"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
//import ExpCell from "./components/ExpressionCell.vue";
import Grid from "./components/Grid.vue";
import IntegradleTitle from "./components/IntegradleTitle.vue";
import Keyboard from "./components/Keyboard.vue";
import Visualizer from "./components/Visualizer.vue";

@Options({
    components: {
        HelloWorld,
        Grid,
        IntegradleTitle,
        Keyboard,
        Visualizer,
    },
})
export default class App extends Vue {
    isKBOpen = true;

    get position(): string {
        return (
            this.$store.state.currentRow + ":" + this.$store.state.currentColumn
        );
    }

    created() {
        let theme = window.localStorage.getItem("theme");
        if (theme == undefined) {
            theme = "light";
        }
        this.$store.commit("SET_THEME", theme);
        this.newPuzzle();
    }

    newPuzzle(isHardmode = false) {
        this.$store.commit("NEW_PUZZLE", isHardmode);
    }

    get previewExpression(): string {
        return this.$store.state.previewExpression;
    }

    get isFinished() {
        return this.$store.state.isFinished;
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
        } else if (event.key == "c") {
            // typing lowercase c will yield uppercase C instead
            this.pushCharacter("C");
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

    get theme() {
        return this.$store.state.theme;
    }

    toggleDarkMode() {
        const newTheme = this.theme == "light" ? "dark" : "light";
        this.$store.commit("SET_THEME", newTheme);
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
    --keyboard-bg: #ffffffaa;
    --accent: #98c379;
    --sans-serif: "Source Sans 3", "Arial", sans-serif;
    --monospace: "JetBrains Mono", "Courier", monospace;
    --serif: "Merriweather", serif;
    --display: "Bree Serif", var(--serif);
}

body {
    background-color: var(--bg0);
    color: var(--fg0);
    transition-duration: 0.2s;
}

body.dark {
    --fg0: #ffffff;
    --fg1: #ededed;
    --fg2: #aaa;
    --fg3: #888;
    --bg0: #333;
    --bg1: #444;
    --bg2: #555;
    --bg3: #98aab3;
    --green: #a6d683;
    --yellow: #f5cd82;
}

.katex-error {
    color: var(--red) !important;
}

h1 {
    margin: 0;
}

#top {
    margin-top: 0;
}

#app {
    font-family: var(--sans-serif);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin: 0;
    margin-top: -0px;
}

.keyboard-container {
    position: sticky;
    bottom: -256px;
    padding: 16px;
    background-color: var(---bg3);
    backdrop-filter: blur(2px);
    transition-duration: 0.2s;
}

.keyboard-container.kb-open {
    bottom: 0;
    position: sticky;
    /*background-color: var(--keyboard-bg);*/
    backdrop-filter: blur(4px);
    transition-duration: 0.2s;
}

.keyboard-container .keyboard-header {
    margin: 8px;
    color: var(--fg2);
    cursor: pointer;
}

.keyboard-container > div {
    display: inline-block;
}

.title-container {
    margin: 16px;
}

.links,
.links a {
    color: var(--fg0);
    transform: scale(1);
    font-size: 24px;
    margin: 8px;
}

.links a:hover svg {
    transform: scale(1.2);
    transition-duration: 0.2s;
}

.links label {
    font-size: 18px;
    font-weight: 600;
}

.links {
    position: relative;
}

.links a[tooltip]:after {
    content: attr(tooltip);
    position: absolute;
    width: 256px;
    font-weight: 500;
    font-size: 18px;
    opacity: 0;
    left: 50%;
    top: 100%;
    margin-left: -128px;
    pointer-events: none;
}

.links a[tooltip]:hover:after {
    opacity: 1;
    transition-duration: 0.2s;
}

div.title > .letters.hardmode-color > span {
    animation: rainbow-bg 1s infinite, shake 0.15s infinite;
    transform: none;
}

#hardmode-icon:hover svg {
    animation: shake 0.15s infinite, rainbow 1s infinite;
}

@keyframes shake {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}

@keyframes rainbow {
    0% {
        color: var(--red);
    }
    20% {
        color: var(--yellow);
    }
    40% {
        color: var(--green);
    }
    60% {
        color: var(--blue);
    }
    80% {
        color: var(--purple);
    }
    100% {
        color: var(--red);
    }
}

@keyframes rainbow-bg {
    0% {
        background-color: var(--red);
    }
    20% {
        background-color: var(--yellow);
    }
    40% {
        background-color: var(--green);
    }
    60% {
        background-color: var(--blue);
    }
    80% {
        background-color: var(--purple);
    }
    100% {
        background-color: var(--red);
    }
}

.display {
    min-height: 64px;
}

.comments-section {
    margin-top: 32px;
}
</style>
