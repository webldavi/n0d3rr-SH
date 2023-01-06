<template>
  <div class="w-max h-max" id="editorContainer">
    <CodeEditorVue
      :config="{ theme: route.params.theme, lang: route.params.lang, defaultValue: decodeURI(route.query.text) || '', disable: route.query.disable || false }" />
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



<!-- <iframe src="localhost:5173/editor/dracula/js"></iframe>

<script>
  //✅ Para desabilitar a edição basta adicionar o atributo disable no id "codeContent"
  document.getElementById('codeContent').setAttribute('disabled', '');

</script> -->
