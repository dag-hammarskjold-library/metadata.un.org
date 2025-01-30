<script setup lang="js">
const { t, locale } = useI18n()
const props = defineProps(['uri'])
</script>
<template>
    <div class="row mb-2">
        <div class="col-3">{{ t('Other Formats') }}</div>
        <div class="col">
            <div class="row">
                <NuxtLink :href="`${props.uri}.ttl`">Turtle</NuxtLink>
                <NuxtLink :href="`${props.uri}.json`">JSON-LD</NuxtLink>
                <NuxtLink :href="`${props.uri}.xml`">RDF/XML</NuxtLink>
            </div>
        </div>
    </div>
</template>