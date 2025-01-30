<script setup lang="js">
const { t, locale } = useI18n()
</script>
<template>
    <div>
        <NuxtLink :href="`/${locale}/thesaurus/`">
            {{ t('UNBIS Thesaurus') }}
        </NuxtLink>
    </div>
</template>