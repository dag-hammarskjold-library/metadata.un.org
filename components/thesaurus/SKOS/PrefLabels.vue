<script setup lang="js">
import useSPARQLData from '~/composables/useSPARQLData'

const { t, locale, setLocale } = useI18n()
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

const getLabelByLang = (data, lang) => {
    return data.find(item => item.label['xml:lang'] === lang)?.label.value || null;
}

const changeLocale = (lang) => {
    setLocale(lang);
}
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
        <div class="row" v-for="lang in ['ar', 'zh', 'en', 'fr', 'ru', 'es']" :key="lang">
            <div class="col-1">{{ lang }}</div>
            <div class="col">
                <NuxtLink :to="`#`" @click.prevent="changeLocale(lang)">
                    {{ getLabelByLang(data, lang) }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>