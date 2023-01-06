<template>
  <div class="w-full min-h-screen bg-gray-900 p-4 flex flex-col gap-12">
    <div class="flex flex-col items-center justify-center ">
      <div class="md:w-[700px] xl:w-[1100px] h-max text-white font-mono flex flex-col gap-4">
        <h1 class="text-4xl text-gray-200">n0d3rr Syntax Highlighter</h1>
        <p class="text-lg text-gray-300 text-justify">Este projeto é um editor de código open-source, conhecido como
          n0d3rr Syntax
          Highlighter, que
          tem como
          objetivo facilitar a vida dos desenvolvedores ao destacar a sintaxe de diferentes linguagens de programação em
          documentos. Além disso, ele é um projeto colaborativo, o que significa que todos podem contribuir com ideias e
          códigos para melhorar ainda mais o editor. O n0d3rr Syntax Highlighter é um recurso valioso para qualquer
          pessoa que precise escrever ou ler código, pois torna o processo mais simples e intuitivo. Além disso, ele é
          de uso livre, o que significa que qualquer pessoa pode utilizá-lo em suas documentações sem qualquer tipo de
          restrição. Em resumo, o n0d3rr Syntax Highlighter é um projeto incrível para quem precisa de uma ferramenta
          eficiente e prática para escrever e ler código.</p>
      </div>
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-2">

      <span class="md:w-[700px] xl:w-[1100px] self-center text-white text-md font-mono font-bold">Selecione o tema e a
        linguagem:</span>

      <div class="w-full flex flex-col gap-4 md:flex-row items-center justify-center md:gap-2">

        <div
          class="md:w-[350px] xl:w-[550px] h-52 overflow-scroll flex flex-row flex-wrap gap-2 border border-gray-700 rounded-lg p-2">
          <span class="p-2 text-center bg-gray-700 rounded-full cursor-pointer font-mono text-xs text-white"
            v-for="(item, index) in themes" @click="setConfig('theme', item.theme)" :key="index">{{ item.theme }}</span>
        </div>

        <div
          class="md:w-[350px] xl:w-[550px] h-52 overflow-scroll flex flex-row flex-wrap gap-2 border border-gray-700 rounded-lg p-2">
          <span class="p-2 text-center bg-gray-700 rounded-full cursor-pointer font-mono text-xs text-white"
            v-for="(item, index) in langs" @click="setConfig('lang', item.lang)" :key="index">{{ item.lang }}</span>
        </div>

      </div>
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-2">
      <div class="w-full md:w-[700px] xl:w-[1100px] flex flex-row justify-start item-center gap-2 p-2">
        <span class="text-white text-md font-mono font-bold flex items-center">Desabilitar
          edição?</span>
        <input v-model="switchDisable" type="checkbox"
          class="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5" />
      </div>
      <div class="w-full md:w-[700px] xl:w-[1100px] flex flex-row justify-start item-center gap-2 p-2">
        <span class="text-white text-md font-mono font-bold flex items-center">Escreva um pequeno texto:</span>
        <input v-model="currentText" type="text" maxlength="20"
          class="p-4 h-6 outline-none rounded-lg bg-gray-700 text-white border border-gray-300">
      </div>
    </div>
    <div class="w-full h-max flex items-center justify-center font-mono">
      <div class="w-full md:w-[700px] xl:w-[1100px] flex flex-col gap-2">
        <h1 class="text-mono text-bold text-3xl text-white">Configurando</h1>
        <div class="flex flex-col pl-4 font-mono gap-2 mb-4">
          <span class="text-white text-lg">
            - Para ter acesso ao editor, basta acessar <Linkvue :to="url">{{ url }}</Linkvue>
          </span>
          <span class="text-white text-lg">
            - E para usar o editor em seu site, basta usar iframe na url
          </span>
          <span class="text-white text-lg">
            - Quando for necessário desabilitar a edição no editor, basta inserir na url o parametro "?disable=true"
          </span>
          <span class="text-white text-lg">
            - Se quiser usar o editor com um valor ja setado como padrão, use o paramentro "?text=" e logo em seguida o
            valor que será setado no editor
          </span>
        </div>
        <div id="codeExample">
          <iframe id="ConfigurationIframe" class="w-full h-96 rounded-lg"></iframe>
        </div>
      </div>
    </div>
    <div class="w-full h-max flex justify-center items-center">
      <div
        class="w-full md:w-[700px] xl:w-[1100px] text-white border-t border-gray-700 pt-2 flex flex-row justify-between items-center">
        <span class="font-mono text-md font-bold">Desenvolvido com 💜 por Luís Daví (n0d3rr)</span>
        <a target="_blank"
          class="font-mono text-md font-bold text-emerald-300 flex flex-row gap-2 w-max border-b border-transparent hover:border-emerald-300"
          href="https://github.com/webldavi/n0d3rr-SH">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          <span>Repositório do projeto</span>
        </a>
        <a target="_blank"
          class="font-mono text-md font-bold text-emerald-300 flex flex-row gap-2 w-max border-b border-transparent hover:border-emerald-300"
          href="https://github.com/webldavi/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          <span>Meu perfil no github</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Linkvue from '../components/Link.vue'

const encodeText = ref('')
const configurationCode = ref(`
<iframe src=""></iframe>

<script>
  // Url com tema dracula e linguagem javascript, com disable true
  const url = "https://n0d3rr-sh.vercel.app/#/editor/dracula/js?disable=true";
  const meuTexto = 'Meu texto aqui'
  //Url encode para ser passada no src do iframe
  const encoded = url + '&text=' + encodeURI(meuTexto);
  //seta o encoded no src do iframe
  document.querySelector('iframe').src = encoded
<\/script>
`)
onMounted(async () => {
  encodeText.value = `/#/editor/github-dark/html?disable=true&text=` //encodeUri ta vindo completo
  document.querySelector('#ConfigurationIframe').src = encodeText.value + encodeURIComponent(configurationCode.value) // Incompleto
})

const config = ref({
  theme: "dracula",
  lang: "js",
});


const url = ref(`/editor/${config.value.theme}/${config.value.lang}`)
function setConfig(key, value) {
  config.value[key] = value;
  url.value = `/editor/${config.value.theme}/${config.value.lang}`
}

const switchDisable = ref(false)
const currentText = ref('')
function setLinkValue() {
  if (currentText.value.length >= 1) {
    url.value = (switchDisable.value)
      ? `/editor/${config.value.theme}/${config.value.lang}?disable=true&text=${currentText.value}`
      : `/editor/${config.value.theme}/${config.value.lang}?text=${currentText.value}`
  } else {
    url.value = (switchDisable.value)
      ? `/editor/${config.value.theme}/${config.value.lang}?disable=true`
      : `/editor/${config.value.theme}/${config.value.lang}`
  }
}

watch(switchDisable, () => {
  setLinkValue()
})
watch(currentText, () => {
  setLinkValue()
})

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
