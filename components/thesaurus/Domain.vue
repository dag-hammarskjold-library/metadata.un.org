<script setup lang="js">
import useSPARQLData from '~/composables/useSPARQLData'

const { t, locale } = useI18n()
const config = useAppConfig()
const props = defineProps(['uri'])

const query = `
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    SELECT ?id ?uri ?label
    WHERE { 
        <${props.uri}> skos:hasTopConcept ?uri . 
        ?uri skos:prefLabel ?label . 
        ?uri dc:identifier ?id .
        FILTER(lang(?label) = "${locale.value}") 
    } 
    ORDER BY ?id
`

const { data, error } = await useSPARQLData(config.thesaurusEndpoint, query)

if (error) {
    console.info("Errors", error.value)
}

</script>
<template>
    <div class="container">
        <div class="row my-3">
            <div class="col-7">
                <!-- skos:prefLabel -->
                <div class="row mb-2">
                    <div class="col-3">
                        {{ t('Preferred Term') }}
                    </div>
                    <div class="col">
                        prefLabel
                    </div>
                </div>
                <!-- skos:hasTopConcept -->
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
                <!-- URI -->
                <div class="row mb-2">
                    <div class="col-3">{{ t('URI') }}</div>
                    <div class="col">
                        <div class="row">{{ uri }}</div>
                    </div>
                </div>
                <!-- Other formats -->
                <div class="row mb-2">
                    <div class="col-3">{{ t('Other Formats') }}</div>
                    <div class="col"></div>
                </div>
            </div>
            <div class="col">
                <div class="row mb-2">
                    <div class="col">
                        {{ t('Language Equivalents') }}
                    </div>
                </div>
                <!-- xml:lang and skos:prefLabel for each lang -->
                <div class="row">
                    <div class="col-1">//Lang</div>
                    <div class="col">//Label</div>
                </div>
            </div>
        </div>

    </div>
</template>