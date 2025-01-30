/**
 * This composable recursively fetches the hierarchy of any given concept by URI
 * @param {string} endpoint - The The SPARQL endpoint to query
 * @param {string} uri - The URI to start with
 * @param {string} lang - The language code to use for label fetching
 */

import { ref } from 'vue'

export default async function useSPARQLHierarchy(endpoint, uri, lang) {
    const hierarchies = ref([])
    const error = ref(null)
    
    function constructQuery(uri, isTopConcept = false) {
        if (isTopConcept) {
            return `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                PREFIX dc: <http://purl.org/dc/elements/1.1/>
                PREFIX eu: <http://eurovoc.europa.eu/schema#>
                SELECT ?scheme ?identifier ?label
                WHERE {
                    <${uri}> skos:topConceptOf ?scheme .
                    OPTIONAL { ?scheme dc:identifier ?identifier . }
                    OPTIONAL { ?scheme skos:prefLabel ?label . FILTER(langMatches(lang(?label), "${lang}")) }
                }
            `
        } else {
            return `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                PREFIX dc: <http://purl.org/dc/elements/1.1/>
                PREFIX eu: <http://eurovoc.europa.eu/schema#>
                SELECT ?o ?label ?identifier
                WHERE {
                    <${uri}> skos:broader ?o .
                    ?o skos:prefLabel ?label .
                    FILTER(langMatches(lang(?label), "${lang}"))
                    OPTIONAL { ?o dc:identifier ?identifier . }
                }
            `
        }
    }

    async function fetchBroaderConcepts(endpoint, uri, path = []) {
        const data = ref(null)

        const query = constructQuery(uri)
        const request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            params: {
                'query': query
            }
        }

        try {
            const response = await useFetch(endpoint, request)
            data.value = response.data.value.results.bindings
        } catch (e) {
            error.value = e
        }

        if (data.value && data.value.length > 0) {
            for (const broader of data.value) {
                const newPath = [...path, { uri: broader.o.value, label: broader.label.value, identifier: broader.identifier?.value }]
                await fetchBroaderConcepts(endpoint, broader.o.value, newPath)
            }
        } else {
            const topConceptQuery = constructQuery(uri, true)
            const topConceptRequest = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                params: {
                    'query': topConceptQuery
                }
            }

            try {
                const response = await useFetch(endpoint, topConceptRequest)
                const topConceptData = response.data.value.results.bindings
                if (topConceptData && topConceptData.length > 0) {
                    for (const scheme of topConceptData) {
                        hierarchies.value.push([...path, { uri, scheme: scheme.scheme.value, identifier: scheme.identifier?.value, label: scheme.label?.value }])
                    }
                }
            } catch (e) {
                error.value = e
            }
        }
    }

    try {
        await fetchBroaderConcepts(endpoint, uri)
    } catch (e) {
        error.value = e
    }

    // Invert and sort hierarchies
    const invertedHierarchies = hierarchies.value.map(path => path.reverse())
    invertedHierarchies.sort((a, b) => {
        const schemeComparison = (a[0].identifier || '').localeCompare(b[0].identifier || '')
        if (schemeComparison !== 0) return schemeComparison
        return (a[1]?.identifier || '').localeCompare(b[1]?.identifier || '')
    })
    
    return { data: ref(invertedHierarchies), error }
}