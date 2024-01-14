<!-- @format -->

# @grainular/nord-router

[![Npm package version](https://badgen.net/npm/v/@grainular/nord-router)](https://www.npmjs.com/package/@grainular/nord-router)
[![Npm package total downloads](https://badgen.net/npm/dt/@grainular/nord-router)](https://npmjs.com/package/@grainular/nord-router)
[![Npm package license](https://badgen.net/npm/license/@grainular/nord-router)](https://npmjs.com/package/@grainular/nord-router)

`@grainular/nord-router` is a powerful client-side routing library for Nørd applications. It provides an intuitive and flexible API to manage navigation and route handling in modern web applications, leveraging Nørd's reactive and component-based architecture.

## Installation

You can install `@grainular/nord-router` using npm or yarn:

```bash
# Using yarn
yarn add @grainular/nord-router

# Using npm
npm install @grainular/nord-router
```

## Features

-   **Declarative Routing**: Define routes in a simple and intuitive manner, with support for dynamic route parameters, nested routes, and redirects.
-   **Reactive Route Handling**: Utilize Nørd's reactive system to respond to route changes and manage route state.
-   **Component-Based**: Seamlessly integrate routing with Nørd components, enabling dynamic component rendering based on the current route.

## Documentation

The complete documentation can be found [here](https://nordjs.dev/packages/router/overview.html)

## Usage

### Basic Routing Setup

```ts
import { createComponent, render } from '@grainular/nord';
import { createRouter, Route } from '@grainular/nord-router';
import { Home } from './pages/home.page.ts';

const routes: Route[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
    },
    // ... more routes ...
];

const router = createRouter(routes, { notFound: '/404' });

const App = createComponent((html) => {
    return html`<div>
        <nav>
            <!-- Navigation links -->
            <a href="/home" ${router.link}>Home</a>
        </nav>
        ${router.outlet}
    </div>`;
});

render(App, { target: document.querySelector('#app') });
```

This example demonstrates defining routes, creating a router, and setting up an outlet for rendering components based on the current route.

## Contributing

We welcome contributions to `Nørd-Router`! If you're interested in contributing, please check out our [contribution guidelines](./contributing.md).

## License

`Nørd-Router` is made available under the MIT License. For more details, see the [license](./license.md) file.
