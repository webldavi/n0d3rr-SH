<template>
  <div class="w-max h-max" id="editorContainer">
    <CodeEditorVue class="min-h-screen"
      :config="{ theme: route.params.theme, lang: route.params.lang, defaultValue: decodeURI(route.query.text || ''), disable: route.query.disable || false }" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import CodeEditorVue from "../components/CodeEditor.vue";

const route = useRoute();
</script>
<style>
#editorContainer {
  min-width: 100%;
}
</style>
