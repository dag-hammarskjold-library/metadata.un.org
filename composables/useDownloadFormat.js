export default function useDownloadTTL(data) {
    const downloadTTL = (acceptHeader = 'text/turtle') => {
        let blob;
        let fileExtension;

        switch (acceptHeader) {
            case 'application/ld+json':
                blob = new Blob([data], { type: 'application/ld+json' });
                fileExtension = 'jsonld';
                break;
            case 'application/rdf+xml':
                blob = new Blob([data], { type: 'application/rdf+xml' });
                fileExtension = 'rdf';
                break;
            case 'text/turtle':
            default:
                blob = new Blob([data], { type: 'text/turtle' });
                fileExtension = 'ttl';
                break;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return {
        downloadTTL
    };
}
