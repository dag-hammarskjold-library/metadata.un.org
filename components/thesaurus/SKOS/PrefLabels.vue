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
    }
`

const { data, error } = await useSPARQLData(config.thesaurusEndpoint, query)



</script>
<template>
    <div class="col">
        <div class="row mb-2">
            <div class="col">
                {{ t('Language Equivalents') }}
            </div>
        </div>
        <!-- xml:lang and skos:prefLabel for each lang -->
        <!-- to do: ensure order is correct -->
        <div class="row" v-for="data in data">
            <div class="col-1">{{ data.label['xml:lang'] }}</div>
            <div class="col">{{ data.label.value }}</div>
        </div>
    </div>
</template>