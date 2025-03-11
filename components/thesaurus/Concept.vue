<script setup lang="js">

const localePath = useLocalePath()
const { t, locale } = useI18n()
const props = defineProps(['uri'])

</script>
<template>
    <div class="container">
        <div class="row my-3">
            <div class="col-7">
                <!-- Don't forget deprecated and deprecated/replaced -->
                <!-- skos:prefLabel -->
                <ThesaurusSKOSPrefLabel :uri="props.uri" />
                <!-- skos:altLabel -->
                <ThesaurusSKOSAltLabels :uri="props.uri" />
                <!-- hierarchy -->
                <ThesaurusHierarchy :uri="props.uri" />
                <!--
                <div class="row mb-2">
                    <div class="col-3">{{ t('Hierarchy') }}</div>
                    <div class="col">

                    </div>
                </div>
                -->
                <!-- skos:broader -->
                <ThesaurusSKOSBroader :uri="props.uri" />
                <!-- skos:narrower-->
                <ThesaurusSKOSNarrower :uri="props.uri" />
                <!-- skos:related -->
                <ThesaurusSKOSRelated :uri="props.uri" />
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
            <ThesaurusSKOSPrefLabels :uri="props.uri" />
        </div>

    </div>
</template>