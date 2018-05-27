[![Build Status](https://travis-ci.org/mikechabot/react-json-form-engine.svg?branch=master)](https://travis-ci.org/mikechabot/react-json-form-engine)
[![Dependency Status](https://david-dm.org/mikechabot/react-json-form-engine.svg)](https://david-dm.org/mikechabot/react-json-form-engine)
[![devDependencies Status](https://david-dm.org/mikechabot/react-json-form-engine/dev-status.svg)](https://david-dm.org/mikechabot/react-json-form-engine?type=dev)

[![NPM](https://nodei.co/npm/react-json-form-engine.png)](https://nodei.co/npm/react-json-form-engine/)

[![GitHub stars](https://img.shields.io/github/stars/mikechabot/react-json-form-engine.svg?style=social&label=Star)](https://github.com/mikechabot/react-json-form-engine)
[![GitHub forks](https://img.shields.io/github/forks/mikechabot/react-json-form-engine.svg?style=social&label=Fork)](https://github.com/mikechabot/react-json-form-engine)

# react-json-form-engine

Build lightning-fast web forms from JSON.

&nbsp; :heart: Robust conditional logic

&nbsp; :heart: Flexible validation

&nbsp; :heart: Mindless deserialization and rehydration

Form state maintenance has always been a burden in web development, and within the React ecosystem especially, there's no shortage of approaches to take. Utilization of Redux has been popular, however the overhead is unnecessary. Other libraries might use `context` or export some type of HOC, however they rely on ever-changing React patterns, and/or deprecatable APIs. 

`react-json-form-engine` takes a different approach: by relying on React as little as possible, and offloading everything else to pure JavaScript. The result is scalable, lightning-fast performance with neglible reliance on the React lifecycle.

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

#### Option 1: Bulma via npm 

1. Install the package:

`$ npm install --save bulma`

2. If your project supports Sass/SCSS, Bulma can be over easily overriden. See [here](https://bulma.io/documentation/overview/start/) for more details:

  ```scss
  /* index.scss */
  
  // 1. Import the initial variables
  @import "../sass/utilities/initial-variables";
  @import "../sass/utilities/functions";

  // 2. Set your own initial variables
  // Update blue
  $blue: #72d0eb;

  // 3. Import the rest of Bulma
  @import "../bulma";
  ```

3. Depending on your build pipeline, either import the compiled CSS or pure SCSS.
 
  ```js
  // App.js
  import './scss/index.scss';
  ```

#### Option 2: Bulma via CDN

`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">`

#### Font Awesome

If you'd like to use [Font Awesome](https://fontawesome.com), be sure to also include the icon pack:

`<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">`

## <a name="react-json-form-engine#getting-started">Getting Started</a>

Under the hood, there are two important components:

* `FormEngine`: JavaScript Class to manage the form instance 
* `<Form />`: React Component to render the form instance

export default {
        id: 'STRINGS',
        title: 'Strings',
        sections: [
            {
                id: 'section_0',
                title: 'Strings',
                subsections: [
                    {
                        id: 'subsection_0',
                        title: 'Store String Values',
                        fields: [
                            {
                                id: 'str1',
                                type: 'string',
                                title: 'Text'
                            }
                        ]
                    }
                ]
            }
        ]
    };

### <a name="react-json-form-engine#example">Example</a>

#### <a name="react-json-form-engine#component">Component</a>

    import React from 'react';
    import { FormEngine, Form } from 'react-json-form-engine';

    import MyForm from './my-form';

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                instance: null
            };
        }

        componentDidMount() {
            // Generate instance from JSON or JavaScript Object
            const instance = new FormEngine(MyForm);
            
            this.setState({instance});
        }

        render() {
            const { instance } = this.state;

            if (!instance) {
                return null;
            }


            return (
              <Form
                instance={instance}
                onUpdate={this._onFormUpdate}
                onSubmit={this._onSubmit}
              />
            );
        }

        _onSubmit = () => {
            const { instance } = this.state;
            console.log(instance.getModel());
        }

        _onFormUpdate = (changeEvent) => {
            // You might want to do something with the latest change
            // event, and then use "setState", otherwise just force a refresh
            this.forceUpdate();
        }

    }

    export default App;
    
#### <a name="react-json-form-engine#json-or-javascript-object">JSON or JavaScript Object</a>

    export default {
        id: 'STRINGS',
        title: 'Strings',
        sections: [
            {
                id: 'section_0',
                title: 'Strings',
                subsections: [
                    {
                        id: 'subsection_0',
                        title: 'Store String Values',
                        fields: [
                            {
                                id: 'str1',
                                type: 'string',
                                title: 'Text'
                            }
                        ]
                    }
                ]
            }
        ]
    };

