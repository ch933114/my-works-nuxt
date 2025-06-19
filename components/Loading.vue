<!-- components/Loading.vue -->
<template>
    <div
      v-if="visible"
      class="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50"
    >
      <div
        class="w-12 h-12 border-4 border-gray-300 border-t-accent1 rounded-full animate-spin"
      ></div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    visible: Boolean,
  })
  </script>
  