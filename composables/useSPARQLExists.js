/** 
 * A very light SPARQL client that tests for the existence of a URI.
 * @constructor
 * @param {string} endpoint - The SPARQL endpoint to query
 * @param {string} query - The SPARQL query to submit
 */
import { ref } from 'vue'

export default async function useSPARQLData(endpoint, uri) {
    const data = ref(null)
    const error = ref(null)

    const query = `
    ASK WHERE {
        { <${uri}> ?p ?o } 
        UNION 
        { GRAPH ?g { <${uri}> ?p ?o } }
    }
    `

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
        data.value = response.data.value.boolean
    } catch (e) {
        error.value = e
    }

    return {
        data,
        error
    }
}