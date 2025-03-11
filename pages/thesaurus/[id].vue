<script setup lang="js">
import useSPARQLExists from '~/composables/useSPARQLExists'

const config = useAppConfig()
const route = useRoute()
const id = route.params.id
const uri = `${config.uriBase}thesaurus/${id}`

const accept_headers = useRequestHeaders(['accept'])
console.log(accept_headers)

let conceptType = 'concept'

if (id.length == 6) {
    conceptType = "microthesaurus"
} else if (id.length > 6) {
    conceptType = "concept"
} else if (id.length == 2) {
    conceptType = 'scheme'
}

// Test existence first, and generate a 404 status if not
const { data, error } = await useSPARQLExists(config.thesaurusEndpoint, uri)
if (!data.value) {
    throw createError({
        statusCode: 404,
        message: 'not found',
        fatal: true
    })
}

</script>
<template>
    <div class="container">
        <UNLibraryThesaurusHeader />
        <div class="container">
            <ThesaurusDomain v-if="conceptType == 'scheme'" :uri="uri" />
            <ThesaurusMicroThesaurus v-if="conceptType == 'microthesaurus'" :uri="uri" />
            <ThesaurusConcept v-if="conceptType == 'concept'" :uri="uri" />
        </div>
    </div>
</template>