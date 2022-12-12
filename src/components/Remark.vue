<template>
    <div id="remark42"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

const remark_config = {
    host: "https://remark.sandvich.xyz",
    site_id: "sandvich",
};

@Options({})
export default class Remark extends Vue {
    mounted() {
        (window as { [key: string]: any })["remark_config"] = remark_config;

        (function (c) {
            for (var i = 0; i < c.length; i++) {
                var d = document;
                var s = d.createElement("script");
                s.src = remark_config.host + "/web/" + c[i] + ".js";
                s.defer = true;
                (d.head || d.body).appendChild(s);
            }
        })(["embed"]);
    }
}
</script>

<style>
#remark42 {
    max-width: 768px;
    min-width: 1024px !important;
    margin: auto;
}
</style>
