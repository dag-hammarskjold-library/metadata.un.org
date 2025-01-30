<script setup lang="js">
const { t, locale } = useI18n()
const props = defineProps(['uri'])

</script>
<template>
    <div class="container">
        <div class="row my-3">
            <div class="col-7">
                <!-- skos:prefLabel -->
                <ThesaurusSKOSPrefLabel :uri="props.uri" />
                <!-- skos:hasTopConcept -->
                <ThesaurusSKOSTopConcepts :uri="props.uri" />
                <!-- URI -->
                <div class="row mb-2">
                    <div class="col-3">{{ t('URI') }}</div>
                    <div class="col">
                        <div class="row">
                            <NuxtLink
                                :href="localePath({ name: 'thesaurus-id', params: { id: props.uri.split('/').slice(-1)[0] } })">
                                {{ props.uri }}</NuxtLink>
                        </div>
                    </div>
                </div>
                <!-- Other formats -->
                <ThesaurusFormats :uri="props.uri" />
            </div>
            <!-- Language Equivalents -->
            <ThesaurusSKOSPrefLabels :uri="props.uri" />
        </div>

    </div>
</template>