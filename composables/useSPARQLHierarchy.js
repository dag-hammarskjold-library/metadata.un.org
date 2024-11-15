/**
 * This composable recursively fetches the hierarchy of any given concept by URI
 * @param {string} endpoint - The The SPARQL endpoint to query
 * @param {string} uri - The URI to start with
 * @param {string} lang - The language code to use for label fetching
 */

import { ref } from 'vue'

export default async function useSPARQLHierarchy(endpoint, uri, lang) {
    function constructQuery(uri) {
        return `PREFIX skos: <http://www.w3.org/2004/02/skos/core#> 
            SELECT ?o ?label
            WHERE {
                <${uri}> skos:broader ?o .
                ?o skos:prefLabel ?label .
                FILTER(langMatches(lang(?label), "${lang}"))
            }
        `
    }

    let hierarchies = []

    async function fetchBroaderConcepts(endpoint, uri) {
        const data = ref(null)
        const error = ref(null)

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
        //console.log("request", request)

        try {
            //console.log("query", query)
            const response = await useFetch(endpoint, request)
            //console.log("response", response)
            data.value = response.data.value.results.bindings
            //console.log("data", data.value)
        } catch (e) {
            error.value = e
            //console.log(error.value)
        }

        let thisHierarchy = []

        if (data.value) {
            data.value.forEach(broader => {
                console.log("broader", broader.o.value, broader.label.value)
                thisHierarchy.push(broader)
                fetchBroaderConcepts(endpoint, broader.o.value)
            })
            hierarchies.push(thisHierarchy)
        }
    }

    fetchBroaderConcepts(endpoint, uri)
    //console.log(hierarchies)

    return { hierarchies }
}