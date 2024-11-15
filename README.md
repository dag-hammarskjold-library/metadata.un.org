# UN Linked Data platform

This is the repository that holds the next generation of the metadata.un.org 
website, which is a front-end for the UN Library's linked data offerings.

It is a Vue3 / Nuxt3 app that uses a SPARQL server as its data source. As 
such, it is portable and only depends on there being a SPARQL endpoint with 
the UN's SKOS data loaded up. 

The startup instructions below assume yarn. Use the package manager of your 
choice to develop, build, and run the application.

## Setup

Make sure to install dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
