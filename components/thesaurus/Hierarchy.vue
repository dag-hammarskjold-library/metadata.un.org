<script setup lang="js">
/**
 * Start with a URI and get each subsequent broader term, all the way up to 
 * the Domain or Concept Scheme in which it is situated.
 */
import useSPARQLHierarchy from '~/composables/useSPARQLHierarchy'

const { t, locale } = useI18n()
const props = defineProps(['uri'])
const config = useAppConfig()

const hierarchies = await useSPARQLHierarchy(config.thesaurusEndpoint, props.uri, locale.value)

</script>
<template>
    <div v-for="hierarchy in hierarchies">{{ hierarchy }}</div>
</template>