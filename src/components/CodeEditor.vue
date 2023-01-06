<template>
  <div class="w-full min-h-screen flex flex-row p-2" :style="{
    backgroundColor: currentTheme,
  }">
    <div class="flex flex-col items-end px-2">
      <span class="text-gray-500 font-mono flex items-center justify-center" v-for="line in codeLines"
        v-bind:key="line">{{ line }}</span>
    </div>
    <div class="flex-1 relative">
      <textarea id="codeContent" v-model="codeContent" placeholder="Seu código aqui..."
        @keydown.tab.prevent.stop="tabber($event)" @keyup.tab="
          textArea.setSelectionRange(currentSelection, currentSelection)
        " ref="textArea"
        class="w-max h-full absolute top-0 -pt-[5px] left-0 bg-transparent text-transparent caret-white outline-none ring-0 overflow-hidden"></textarea>
      <div class="flex-1" v-html="htmlCode"></div>
    </div>
  </div>
</template>

<script setup>
import { getHighlighter } from "shiki";
import { ref, defineProps, watch, onMounted } from "vue";

// -- Variáveis
const codeLines = ref(1);
const codeContent = ref("\n");
const setTheme = ref({});
const htmlCode = ref("");
const currentTheme = ref("");
const textArea = ref(null);
const currentSelection = ref(0);

// -- Define
const props = defineProps({
  config: Object,
});

// -- Funções
function loadTheme() {
  codeContent.value = props.config.defaultValue
  if (JSON.parse(props.config.disable)) {
    textArea.value.setAttribute('disabled', '')
  }
  getHighlighter({
    theme: props.config.theme.toLowerCase(),
    langs: [props.config.lang],
  }).then((highlighter) => {
    currentTheme.value = highlighter.getBackgroundColor(
      props.config.theme.toLowerCase()
    );
    setTheme.value = highlighter;
    htmlCode.value = highlighter.codeToHtml(`${codeContent.value}`, {
      lang: props.config.lang,
    });
  });
}

function tabber({ target: { selectionEnd, selectionStart, value } }) {
  const start = selectionStart;
  const end = selectionEnd;
  codeContent.value = `${value.substring(0, start)}  ${value.substring(end)}`;
  currentSelection.value = end + 2;
}

// --
onMounted(() => {
  loadTheme();
  codeLines.value = codeContent.value.split("\n").length;
});

watch(codeContent, async () => {
  if (!JSON.parse(props.config.disable)) {
    codeLines.value = codeContent.value.split("\n").length
    htmlCode.value = await setTheme.value.codeToHtml(`${codeContent.value}`, {
      lang: props.config.lang,
    });
  }
});
</script>

<style>
#codeContent {
  margin: 0;
  padding: 0;
  outline: unset;
  border: none;
  resize: none !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 1em;
  min-width: 100%;
}
</style>
