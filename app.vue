<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <div :dir="locale == 'ar' ? 'rtl' : 'ltr'">
    <UNHeader />
    <UNLibraryHeader />
    <NuxtPage />
    <UNLibraryFooter />
    <UNFooter />
  </div>
</template>
