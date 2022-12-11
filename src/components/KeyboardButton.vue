<template>
    <div>{{ key }}</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        key: String,
    },
})
export default class KeyboardButton {
    key!: string;
}
</script>