<template>
  <div
    class="w-full h-max min-h-screen flex flex-col gap-6 items-center justify-center p-12 bg-zinc-900"
  >
    <div class="w-full h-max flex flex-row gap-12 text-white">
      <div class="flex flex-col gap-2 w-max">
        <label class="text-lg">Escolha o tema</label>
        <Dropdown
          :list="
            themes.map((t) => {
              return {
                name: t.theme,
              };
            })
          "
          v-on:get-select="(e) => updateConfig('theme', e.name)"
        >
          {{ currentConfig.theme }}
        </Dropdown>
      </div>
      <div class="flex flex-col gap-2 w-max">
        <label class="text-lg">Escolha a linguagem</label>
        <Dropdown
          :list="
            langs.map((t) => {
              return {
                name: t.lang,
              };
            })
          "
          v-on:get-select="(e) => updateConfig('lang', e.name)"
        >
          {{ currentConfig.lang }}
        </Dropdown>
      </div>
    </div>
    <div class="w-full h-max overflow-auto rounded-xl" id="code">
      <CodeEditorVue
        v-if="renderEditor"
        :config="{
          theme: currentConfig.theme,
          lang: currentConfig.lang,
          defaultValue: '',
          snap: true,
          disable: false,
        }"
      />
    </div>
    <div class="w-full flex flex-row gap-2">
      <input
        type="text"
        placeholder="Titulo da imagem"
        class="w-full rouneded bg-transparent text-white outline-none"
        v-model="currentFilename"
      />
      <button
        @click="exportImage"
        class="h-12 w-max p-2 rounded bg-purple-400 border border-purple-500 text-purple-800 font-bold transition-all hover:scale-[1.05]"
      >
        Exportar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import CodeEditorVue from "../components/CodeEditor.vue";
import Dropdown from "../components/Dropdown.vue";
import domtoimage from "dom-to-image";

const currentFilename = ref("");
const currentConfig = ref({
  theme: "material-darker",
  lang: "javascript",
});
const renderEditor = ref(true)

async function updateConfig(key, value) {
    renderEditor.value = false
    currentConfig.value[key] = value;
    await nextTick()
    renderEditor.value = true
    setTimeout(()=>{
        console.clear()
    }, 100)
}


function exportImage() {
  const node = document.querySelector("#code > div");
  domtoimage
    .toPng(node)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      var link = document.createElement("a");
      link.href = img.src;
      link.download = `${currentFilename.value || 'image'}.png`;
      link.click();
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

const langs = ref([
  { lang: "abap" },
  { lang: "actionscript-3" },
  { lang: "ada" },
  { lang: "apache" },
  { lang: "apex" },
  { lang: "apl" },
  { lang: "applescript" },
  { lang: "asm" },
  { lang: "astro" },
  { lang: "awk" },
  { lang: "ballerina" },
  { lang: "bat" },
  { lang: "berry" },
  { lang: "bibtex" },
  { lang: "bicep" },
  { lang: "blade" },
  { lang: "c" },
  { lang: "cadence" },
  { lang: "clarity" },
  { lang: "clojure" },
  { lang: "cmake" },
  { lang: "cobol" },
  { lang: "codeql" },
  { lang: "coffee" },
  { lang: "cpp-macro" },
  { lang: "cpp" },
  { lang: "crystal" },
  { lang: "csharp" },
  { lang: "css" },
  { lang: "cue" },
  { lang: "d" },
  { lang: "dart" },
  { lang: "diff" },
  { lang: "docker" },
  { lang: "dream-maker" },
  { lang: "elixir" },
  { lang: "elm" },
  { lang: "erb" },
  { lang: "erlang" },
  { lang: "fish" },
  { lang: "fsharp" },
  { lang: "gherkin" },
  { lang: "git-commit" },
  { lang: "git-rebase" },
  { lang: "glsl" },
  { lang: "gnuplot" },
  { lang: "go" },
  { lang: "graphql" },
  { lang: "groovy" },
  { lang: "hack" },
  { lang: "haml" },
  { lang: "handlebars" },
  { lang: "haskell" },
  { lang: "hcl" },
  { lang: "hlsl" },
  { lang: "html" },
  { lang: "imba" },
  { lang: "ini" },
  { lang: "java" },
  { lang: "javascript" },
  { lang: "jinja-html" },
  { lang: "jinja" },
  { lang: "json" },
  { lang: "json5" },
  { lang: "jsonc" },
  { lang: "jsonnet" },
  { lang: "jssm" },
  { lang: "jsx" },
  { lang: "julia" },
  { lang: "kotlin" },
  { lang: "latex" },
  { lang: "less" },
  { lang: "liquid" },
  { lang: "lisp" },
  { lang: "logo" },
  { lang: "lua" },
  { lang: "make" },
  { lang: "markdown" },
  { lang: "marko" },
  { lang: "matlab" },
  { lang: "mdx" },
  { lang: "mermaid" },
  { lang: "nginx" },
  { lang: "nim" },
  { lang: "nix" },
  { lang: "objective-c" },
  { lang: "objective-cpp" },
  { lang: "ocaml" },
  { lang: "pascal" },
  { lang: "perl" },
  { lang: "php-html" },
  { lang: "php" },
  { lang: "plsql" },
  { lang: "postcss" },
  { lang: "powershell" },
  { lang: "prisma" },
  { lang: "prolog" },
  { lang: "proto" },
  { lang: "pug" },
  { lang: "puppet" },
  { lang: "purescript" },
  { lang: "python" },
  { lang: "r" },
  { lang: "raku" },
  { lang: "razor" },
  { lang: "rel" },
  { lang: "riscv" },
  { lang: "rst" },
  { lang: "ruby" },
  { lang: "rust" },
  { lang: "sas" },
  { lang: "sass" },
  { lang: "scala" },
  { lang: "scheme" },
  { lang: "scss" },
  { lang: "shaderlab" },
  { lang: "shellscript" },
  { lang: "smalltalk" },
  { lang: "solidity" },
  { lang: "sparql" },
  { lang: "sql" },
  { lang: "ssh-config" },
  { lang: "stata" },
  { lang: "stylus" },
  { lang: "svelte" },
  { lang: "swift" },
  { lang: "system-verilog" },
  { lang: "tasl" },
  { lang: "tcl" },
  { lang: "tex" },
  { lang: "toml" },
  { lang: "tsx" },
  { lang: "turtle" },
  { lang: "twig" },
  { lang: "typescript" },
  { lang: "v" },
  { lang: "vb" },
  { lang: "verilog" },
  { lang: "vhdl" },
  { lang: "viml" },
  { lang: "vue-html" },
  { lang: "vue" },
  { lang: "wasm" },
  { lang: "wenyan" },
  { lang: "xml" },
  { lang: "xsl" },
  { lang: "yaml" },
  { lang: "zenscript" },
]);

const themes = ref([
  { theme: "css-variables" },
  { theme: "dark-plus" },
  { theme: "dracula-soft" },
  { theme: "dracula" },
  { theme: "github-dark-dimmed" },
  { theme: "github-dark" },
  { theme: "github-light" },
  { theme: "hc_light" },
  { theme: "light-plus" },
  { theme: "material-darker" },
  { theme: "material-default" },
  { theme: "material-lighter" },
  { theme: "material-ocean" },
  { theme: "material-palenight" },
  { theme: "min-dark" },
  { theme: "min-light" },
  { theme: "monokai" },
  { theme: "nord" },
  { theme: "one-dark-pro" },
  { theme: "poimandres" },
  { theme: "rose-pine-dawn" },
  { theme: "rose-pine-moon" },
  { theme: "rose-pine" },
  { theme: "slack-dark" },
  { theme: "slack-ochin" },
  { theme: "solarized-dark" },
  { theme: "solarized-light" },
  { theme: "vitesse-dark" },
  { theme: "vitesse-light" },
]);
</script>


<style scoped>
#code > div{
    @apply rounded-xl
}

</style>