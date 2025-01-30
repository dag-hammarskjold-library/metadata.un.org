<script setup lang="js">
const config = useAppConfig()
const uri = config.uriBase + 'thesaurus/00'
</script>
<template>
    <div class="container">
        <UNLibraryThesaurusHeader />
        <div class="container">
            <ThesaurusDomainList :uri="uri" />
        </div>
    </div>
</template>