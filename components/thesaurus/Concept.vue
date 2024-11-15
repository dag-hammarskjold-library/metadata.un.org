<script setup lang="js">

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
                <ThesaurusSKOSBroader :uri="uri" />
                <!-- skos:narrower-->
                <ThesaurusSKOSNarrower :uri="uri" />
                <!-- skos:related -->
                <ThesaurusSKOSRelated :uri="uri" />
                <!-- URI -->
                <div class="row mb-2">
                    <div class="col-3">{{ t('URI') }}</div>
                    <div class="col">{{ props.uri }}</div>
                </div>
                <!-- Other formats -->
                <div class="row mb-2">
                    <div class="col-3">{{ t('Other Formats') }}</div>
                    <div class="col"></div>
                </div>
            </div>
            <ThesaurusSKOSPrefLabels :uri="uri" />
        </div>

    </div>
</template>