<script setup lang="js">
import useSPARQLData from '~/composables/useSPARQLData'

const { t, locale } = useI18n()
const props = defineProps(['uri'])
const config = useAppConfig()
const query = `
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    SELECT ?label
    WHERE {
        <${props.uri}> skos:prefLabel ?label .
        FILTER(langMatches(lang(?label), "${locale.value}"))
    }
`

const { data, error } = await useSPARQLData(config.thesaurusEndpoint, query)

</script>
<template>
    <div class="row mb-2">
        <div class="col-3">
            {{ t('Preferred Term') }}
        </div>
        <div class="col">

            {{ data[0].label.value }}

        </div>
    </div>
</template>