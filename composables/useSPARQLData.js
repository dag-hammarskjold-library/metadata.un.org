/** 
 * A very light SPARQL client that retrieves properties for URIs we already know about.
 * @constructor
 * @param {string} endpoint - The SPARQL endpoint to query
 * @param {string} query - The SPARQL query to submit
 */
import { ref } from 'vue'

export default async function useSPARQLData(endpoint, query) {
    const data = ref(null)
    const error = ref(null)

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

    return {
        data,
        error
    }
}