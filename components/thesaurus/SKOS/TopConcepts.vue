<script setup lang="js">
import useSPARQLData from '~/composables/useSPARQLData'

const props = defineProps(['uri'])
const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useAppConfig()

const query = `
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        SELECT ?id ?uri ?label
        WHERE {
            ?uri skos:topConceptOf <${props.uri}> .
            ?uri skos:prefLabel ?label .
            ?uri dc:identifier ?id .
        FILTER(langMatches(lang(?label), "${locale.value}"))
        }
        ORDER BY ?id
    `
const { data, error } = await useSPARQLData(config.thesaurusEndpoint, query)

</script>

<template>
    <div class="row mb-2" v-if="data">
        <div class="col-3">{{ t('Top Concepts') }}</div>
        <div class="col">
            <div class="row" v-for="data in data">
                <NuxtLink
                    :href="localePath({ name: 'thesaurus-id', params: { id: data.uri.value.split('/').slice(-1)[0] } })">
                    {{
                        data.id.value }} - {{
                        data.label.value }}</NuxtLink>
            </div>
        </div>
    </div>
</template>