<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>
<template>
    <div>
        <p>
            <NuxtLink :to="localePath('thesaurus')">
                {{ t('UNBIS Thesaurus') }}
            </NuxtLink>
        </p>
        <p>
            <NuxtLink :to="localePath('sdg')">
                {{ t('SDGs Ontology') }}
            </NuxtLink>
        </p>
    </div>
</template>