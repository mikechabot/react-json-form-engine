# <a href='https://github.com/mikechabot/react-json-form-engine'><img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-storybook/master/src/assets/logo_transparent.png' height='90' alt='logo' aria-label='https://github.com/mikechabot/react-json-form-engine' /></a>

Build lightning-fast web forms from JSON.

<div align="center">
:heart: Robust conditional logic :heart: Flexible validation :heart: Mindless deserialization and rehydration
</div>

Within the React ecosystem, there's no shortage of approaches to take for form state management. Utilization of Redux is popular, but the overhead is unnecessary. Other libraries might use `context`, or export some type of HOC, however they rely on ever-changing React patterns, and/or deprecatable APIs. 

`react-json-form-engine` takes a different approach: by relying on React as little as possible, and offloading everything else to pure JavaScript. The result is scalable, lightning-fast performance with neglible reliance on the React lifecycle.

<div align="center">  
  <a href="https://travis-ci.org/mikechabot/react-json-form-engine">
    <img src="https://travis-ci.org/mikechabot/react-json-form-engine.svg?branch=master" alt="build status" />
  </a>
  <a href="https://www.npmjs.com/package/react-json-form-engine">
    <img src="https://img.shields.io/npm/v/npm.svg" alt="npm version" />
  </a>
  <a href="https://david-dm.org/mikechabot/react-json-form-engine">
    <img src="https://david-dm.org/mikechabot/react-json-form-engine.svg" alt="dependency status" />
  </a>
  <a href="https://github.com/mikechabot/react-json-form-engine/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="prs welcome" />
  </a>
</div>

----

## Table of Contents

- [Live Demo](#live-demo)
- [Installing](#installing)
- [Getting Started](#getting-started)
  - [Example](#example)
    - [Component](#component)
    - [Form](#json-or-javascript-object)
  
  
## <a id="live-demo">Live Demo</a>

* https://mikechabot.github.io/react-json-form-engine-storybook/

> Clone the demo from [here](https://github.com/mikechabot/react-json-form-engine-storybook)

## <a id="installing">Installing</a>

Requires React 15.0.0+

`$ npm install --save react-json-form-engine`

> Note: This library renders [Bulma](https://bulma.io/documentation/overview/start/) semantics, you'll need to include the styles on your own. You can either install it with npm, and `require`/`import` the CSS/SCSS, or have it served from a CDN.

#### Bulma via CDN

`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">`

#### Bulma via npm 

`$ npm install --save bulma`

1. If your project supports Sass/SCSS, Bulma can be over easily overriden:

  ```scss
  /* index.scss */
  
  // 1. Import the initial variables
  @import "../sass/utilities/initial-variables";
  @import "../sass/utilities/functions";

  // 2. Set your own initial variables
  $blue: #72d0eb;

  // 3. Import the rest of Bulma
  @import "../bulma";
  ```

2. Depending on your build pipeline, either import the compiled CSS, or uncompiled SCSS.
 
  ```js
  // App.js
  import './scss/index.scss';
 ```

#### Font Awesome

If you'd like to use [Font Awesome](https://fontawesome.com), be sure to also include the icon pack:

`<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">`

### Starter Template

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>react-json-form-engine</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## <a name="react-json-form-engine#getting-started">Getting Started</a>

*...in process...*
