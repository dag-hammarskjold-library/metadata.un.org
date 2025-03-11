import { eventHandler } from "h3"

export default eventHandler ((req, res, next) => {
    const url = req.url
    const acceptHeader = req.headers.accept || ''

    const extensionMatch = url.match(/\.([a-z]+)$/i)
    let requestedType = 'text/html'

    if (extensionMatch) {
        const extension = extensionMatch[1].toLowerCase()
        switch (extension) {
            case 'xml':
                requestedType = 'application/rdf+xml'
                break
            case 'json':
                requestedType = 'applicatoin/ld+json'
        }
    }
})