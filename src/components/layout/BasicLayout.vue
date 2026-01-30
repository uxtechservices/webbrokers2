<template>
  <div class="min-h-screen xl:flex">
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
    >
      <app-header :goBack="true"/>
      <div class="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
</script>
