<script setup lang="js">
const localePath = useLocalePath()
const { t, locale } = useI18n()
const props = defineProps(['uri'])
const trimmedURI = props.uri.slice(0,-2)

</script>
<template>
    <div class="container">
        <div class="row my-3">
            <div class="col-7">
                <!-- Don't forget deprecated and deprecated/replaced -->
                <!-- rdf:type skos:Concept-->
                <ThesaurusSKOSSchemes :uri="props.uri" />
                <!-- URI -->
                <div class="row mb-2">
                    <div class="col-3">{{ t('URI') }}</div>
                    <div class="col">
                        <div class="row">
                            <NuxtLink
                                :href="localePath({ name: 'thesaurus-id', params: {id: '/'} }).slice(0,-3)">
                                {{ trimmedURI }}</NuxtLink>
                        </div>
                    </div>
                </div>
                <!-- Other formats -->
                <ThesaurusFormats :uri="props.uri" />
            </div>
            <ThesaurusSKOSPrefLabels :uri="props.uri" />
        </div>

    </div>
</template>