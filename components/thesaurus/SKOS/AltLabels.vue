<script setup lang="js">
import useSPARQLData from '~/composables/useSPARQLData'

const { t, locale } = useI18n()
const props = defineProps(['uri'])
const config = useAppConfig()
const query = `
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    SELECT ?label
    WHERE {
        <${props.uri}> skos:altLabel ?label .
        FILTER(langMatches(lang(?label), "${locale.value}"))
    }
`

const { data, error } = await useSPARQLData(config.thesaurusEndpoint, query)

let altLabels = []
if (data) {
    for (let d of data.value) {
        altLabels.push(d.label.value)
    }
}

</script>
<template>
    <div class="row mb-2" v-if="data.length > 0">
        <div class="col-3">
            {{ t('Used For') }}
        </div>
        <div class="col">
            {{ altLabels.join(", ") }}
        </div>
    </div>
</template>