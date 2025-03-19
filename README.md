# Meeting room

This template should help get you started developing with Vue 3 in Vite.

> NOTE: Safari does not fully support IndexedDB, causing issues when saving.
> Please use Chrome.

## GitHub Pages

The deployed site can be access
[here](https://franco-from-owlish.github.io/meeting-room/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server. It is much
faster than the production build.

But it's still recommended to test the production build with `test:e2e` before
deploying (e.g. in CI environments):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
