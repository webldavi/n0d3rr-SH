<script  setup>
import { defineProps } from 'vue';

const props = defineProps({
  to: String
})
</script>

<template>
  <router-link :to="props.to" class="p-2 border rounded-md border-gray-400 bg-gray-800 text-gray-300 font-mono ">
    <slot></slot>
  </router-link>
</template>
