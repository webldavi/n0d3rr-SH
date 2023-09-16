<template>
  <div
    class=" flex flex-row p-2 w-max min-w-full"
    :class="{'min-h-[20rem]': props.config.snap, 'min-h-screen': !props.config.snap}"
    @mouseenter="showCopyButton = true"
    @mouseleave="showCopyButton = false"
    :style="{
      backgroundColor: currentTheme,
    }"
  >
    <div class="flex flex-col items-end px-2">
      <span
        class="text-gray-500 font-mono flex items-center justify-center"
        v-for="line in codeLines"
        v-bind:key="line"
        >{{ line }}</span
      >
    </div>
    <div class="flex-1 relative">
      <div
        class="absolute border border-white z-20 top-2 right-2 bg-zinc-900 p-2 rounded-lg drop-shadow-md cursor-pointer"
        v-show="showCopyButton"
        @click="copyCode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
          />
        </svg>
      </div>
      <textarea
        id="codeContent"
        v-model="codeContent"
        placeholder="Seu código aqui..."
        @keydown.tab.prevent.stop="tabber($event)"
        @keyup.tab="
          textArea.setSelectionRange(currentSelection, currentSelection)
        "
        ref="textArea"
        class="w-max h-full absolute top-0 -pt-[5px] left-0 bg-transparent text-transparent caret-white outline-none ring-0 overflow-hidden"
      ></textarea>
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
const showCopyButton = ref(false);

// -- Define
const props = defineProps({
  config: Object,
});

// -- Funções
function loadTheme() {
  codeContent.value = props.config.defaultValue;
  if (JSON.parse(props.config.disable)) {
    textArea.value.setAttribute("disabled", "");
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

function copyCode() {
  textArea.value.select();
  textArea.value.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(codeContent.value);
}
// --
onMounted(() => {
  loadTheme();
  codeLines.value = codeContent.value.split("\n").length;
});

watch(codeContent, async () => {
  if (!JSON.parse(props.config.disable)) {
    codeLines.value = codeContent.value.split("\n").length;
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
