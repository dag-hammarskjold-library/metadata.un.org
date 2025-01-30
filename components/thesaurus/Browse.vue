<script setup lang="js">
import useSPARQLData from '~/composables/useSPARQLData'

const { t, locale } = useI18n()
const config = useAppConfig()
const schemeQuery = `
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    SELECT ?uri ?label
    WHERE {
        ?uri a skos:ConceptScheme ;
            skos:prefLabel ?label .
        FILTER (lang(?label) = "${locale.value}")
    }
`
console.log(schemeQuery)
const { data, error } = await useSPARQLData(config.thesaurusEndpoint, schemeQuery)
</script>
<template>
    {{ data }}
</template>