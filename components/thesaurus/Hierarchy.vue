<script setup lang="js">
/**
 * Start with a URI and get each subsequent broader term, all the way up to 
 * the Domain or Concept Scheme in which it is situated.
 */
import useSPARQLHierarchy from '~/composables/useSPARQLHierarchy'

const localePath = useLocalePath()
const { t, locale } = useI18n()
const props = defineProps(['uri'])
const config = useAppConfig()

const {data, error} = await useSPARQLHierarchy(config.thesaurusEndpoint, props.uri, locale.value)

</script>
<template>
    <!-- <div v-for="hierarchy in hierarchies">{{ hierarchy }}</div> -->
    <div class="row mb-2" v-if="data">
        <div class="col-3">{{ t('Hierarchy') }}</div>
        <div class="col">
            <div class="row" v-for="hierarchies in data">
                <div v-for="(hierarchy, index) in hierarchies">
                    <NuxtLink v-if="hierarchy.scheme" :href="localePath({ name: 'thesaurus-id', params: { id: hierarchy.scheme.split('/').slice(-1)[0] } })">
                        <span :class="`mx-` + (Number(index)*2)">{{ hierarchy.identifier }} - {{ hierarchy.label }}</span>
                    </NuxtLink>
                    <NuxtLink v-else :href="localePath({ name: 'thesaurus-id', params: { id: hierarchy.uri.split('/').slice(-1)[0] } })">
                        <span :class="`mx-` + (Number(index)*2)">{{ hierarchy.identifier }}<span v-if="hierarchy.identifier"> - </span>{{ hierarchy.label }}</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>