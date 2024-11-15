<script setup lang="js">
import useSPARQLData from '~/composables/useSPARQLData'

const props = defineProps(['uri'])
const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useAppConfig()

const query = `
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        SELECT ?uri ?label
        WHERE {
            <${props.uri}> skos:broader ?uri .
            ?uri skos:prefLabel ?label .
        FILTER(langMatches(lang(?label), "${locale.value}"))
        }
    `

const { data, error } = await useSPARQLData(config.thesaurusEndpoint, query)

</script>
<template>
    <div class="row mb-2" v-if="data">
        <div class="col-3">{{ t('Broader Terms') }}</div>
        <div class="col">
            <div class="row" v-for="data in data">
                <NuxtLink
                    :href="localePath({ name: 'thesaurus-id', params: { id: data.uri.value.split('/').slice(-1)[0] } })">
                    {{
                        data.label.value }}</NuxtLink>
            </div>
        </div>
    </div>
</template>