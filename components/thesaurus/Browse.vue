<script setup lang="js">
import useSPARQLData from '~/composables/useSPARQLData'

const { t, locale } = useI18n()
const config = useAppConfig()
const schemeQuery = `
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    SELECT ?id ?uri ?label
    WHERE {
        ?uri a skos:ConceptScheme ;
            skos:prefLabel ?label .
            ?uri dc:identifier ?id .
        FILTER (lang(?label) = "${locale.value}")
    }
    ORDER BY ?id
`

const { data, error } = await useSPARQLData(config.thesaurusEndpoint, schemeQuery)

async function getTopConcepts(uri) {
    const query = `
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        SELECT ?id ?uri ?label
        WHERE {
            ?uri skos:topConceptOf <${uri}> .
            ?uri skos:prefLabel ?label .
            ?uri dc:identifier ?id .
        FILTER(langMatches(lang(?label), "${locale.value}"))
        }
        ORDER BY ?id
    `
    const result = await useSPARQLData(config.thesaurusEndpoint, query)
    return result.data
}
</script>
<template>
    <div>
        <div v-for="scheme in data" :key="scheme.uri.value">
            <Anchor icon="bi:plus-square" />
            <NuxtLink :to="`/thesaurus/${scheme.uri.value.split('/').slice(-1)[0]}`">
                {{ scheme.id.value }} - {{ scheme.label.value }}
            </NuxtLink>
            <div v-for="concept in getTopConcepts(scheme.uri.value).data" :key="concept.uri.value">
                <NuxtLink :to="`/thesaurus/${concept.uri.value.split('/').slice(-1)[0]}`">
                    {{ concept.id.value }} - {{ concept.label.value }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>