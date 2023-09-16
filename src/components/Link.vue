<script  setup>
import { defineProps } from 'vue';

const props = defineProps({
  to: String
})
</script>

<template>
  <router-link :to="props.to" class="p-2 border rounded-md border-zinc-400 bg-zinc-800 text-zinc-300 font-mono ">
    <slot></slot>
  </router-link>
</template>
