# <a href='https://github.com/mikechabot/react-json-form-engine'><img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-demo/master/src/assets/banner_dark.png' alt='logo' aria-label='https://github.com/mikechabot/react-json-form-engine' /></a>

Build lightning fast web forms from JSON.

:heart: Conditional logic 
<br/>
:heart: Flexible validation 
<br/>
:heart: Infinite depth
<br/>
:heart: Rehydratable 

While other libraries might utilize [react-redux](https://github.com/reduxjs/react-redux), [`refs`](https://reactjs.org/docs/refs-and-the-dom.html), or [Context](https://reactjs.org/docs/context.html) for form state management, `react-json-form-engine` relies on React as little as possible, and offloads its core logic to plain JavaScript, while utilzing [mobx](https://mobx.js.org/) bindings for rendering. The result is scalable, lightning-fast performance with neglible reliance on the React lifecycle.

It's important to note that this library was designed to manage large, multi-section forms, that may contain conditional logic (e.g. Show field `Foo` based on the response given in field `Bar`). This may or may not be for you, but it can also handle simple forms with extreme ease.

It also offers a mechanism for serializing all form responses to JSON for persistence. The reverse also stands, as any form can be easily rehydrated from historical data, and returned to its previous state.

<div align="center">  
  <a href="https://travis-ci.org/mikechabot/react-json-form-engine">
    <img src="https://travis-ci.org/mikechabot/react-json-form-engine.svg?branch=master" alt="build status" />
  </a>
  <a href="https://www.npmjs.com/package/react-json-form-engine">
    <img src="https://img.shields.io/npm/v/react-json-form-engine.svg" alt="npm version" />
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
- [Storybook](#storybook)
- [Getting Started](#getting-started)
  - [Login Form Example](#login-form-example)
- [Form Engine](#form-engine)
  - [Form Definition](#form-definition)
  - [Field Definition](#field-definition)
  - [Field Type](#field-type)
  - [Field Children](#field-children)
  - [Field Options](#field-options)
  - [Field Props List](#field-props-list)
  - [Field Type Transitions](#field-type-transitions)
  - [Field Decorators](#field-decorators)
- [Validation](#validation)
- [Conditions](#conditions)
- [Serialize](#serialize)

----

## <a id="live-demo">Live Demo</a>

https://mikechabot.github.io/react-json-form-engine-demo/

https://mikechabot.github.io/react-json-form-engine-storybook/

## <a id="installing">Installing</a>

Requires React 15.0.0+

`$ npm install --save react-json-form-engine`

> Note: This library renders [Bulma](https://bulma.io/documentation/overview/start/) semantics; you'll need to import the styles for everything to look nice.

```js
// Import the styles
import 'react-json-form-engine/dist/css/styles.min.css';

// Import the API
import { Form, FormEngine } from 'react-json-form-engine';
```

----

## <a id="storybook">Storybook</a>

To run the `react-json-form-engine` [storybook](https://storybook.js.org/) locally:

```bash
$ git clone https://github.com/mikechabot/react-json-form-engine.git
$ npm install
$ npm run storybook
```

Available at http://localhost:6006/

----

## <a id="getting-started">Getting Started</a>

First, let's import the API:

```javascript
import { Form, FormEngine } from 'react-json-form-engine';
```

Next, we'll need to build a [Form Definition](#form-definition), which is the skeleton structure that describes how the form should look and behave. The definition must adhere to a strict schema, and can be represented as a JavaScript object or a [JSON Schema](http://json-schema.org). But don't worry about the details yet, we'll get into those. 

Once we've built our definition, we'll feed it to the `FormEngine`, which returns an instance:

```javascript
const instance = new FormEngine(definition);
```

Then, we just pass the instance to the `<Form />` component, and `react-json-form-engine` takes care of the rest:

```jsx
<Form
  instance={instance}
  onSubmit={() => {
    const responses = instance.serializeModel();
    // Do stuff
  }}
/>
```

### <a id="login-form-example">Login Form Example</a>

Let's create a simple login form. Either follow along below, or check out the [storybook](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/examples--login-form).

#### Login Form Definition

Here's our definition, which is a rather simple one. It consists of just a single section with a single subsection, which houses three fields. Note, we're also using a [Field Decorator](#field-decorators) to ensure `user_pass` renders as a password field:

```javascript
const loginForm = {
  id: "login_form",
  title: "Welcome to Foo!",
  sections: [
    {
      id: "section_1",
      title: "Login Section",
      subsections: [
        {
          id: "subsection_1",
          title: "Login",
          subtitle: "Please enter your credentials.",
          fields: [
            {
              id: "user_name",
              title: "Username",
              type: "string"
            },
            {
              id: "user_pass",
              title: "Password",
              type: "string"
            },
            {
              id: "remember_me",
              title: "Remember me",
              type: "boolean"
            }
          ]
        }
      ]
    }
  ],
  decorators: {
    "user_pass": {
      component: {
        type: "password"
      }
    }
  }
};
```

Now that we have our definition, let's create an instance of `FormEngine`:

```javascript
const instance = new FormEngine(loginForm); 
```

With the instance in hand, we can pass it our `<Form />` component:

```jsx
const LoginForm = () => (
  <Form
    instance={instance}
    onSubmit={() => {
       // Do stuff
    }}
  />
);
```

And once filled out, `onSubmit` will get us the form responses:

```jsx
const LoginForm = () => (
  <Form
    hideFormTitle
    submitButtonLabel="Login"
    instance={instance}
    onSubmit={() => {
      console.log(instance.getModel());         // Get form responses
      console.log(instance.serializeModel());   // Serialize form responses
    }}
  />
);
```

----

## <a id="form-engine">Form Engine</a>

- [Form Definition](#form-definition)
- [Field Definition](#field-definition)
- [Field Type](#field-type)
- [Field Children](#field-children)
- [Field Options](#field-options)
- [Field Props List](#field-props-list)
- [Field Type Transitions](#field-type-transitions)
- [Field Decorators](#field-decorators)

### <a id="form-definition">Form Definition</a>

Form definitions adhere to a strict schema. They must contain at least **one section**, which contains at least **one subsection**, which contains at least **one [Field Definition](#field-definition)**. You may find this schema verbose for smaller forms, however it scales well for significantly complex forms.

> View the full schema in the [FormAPIService](https://github.com/mikechabot/react-json-form-engine/blob/master/src/form/service/form-api-service.js#L27)

> In forms with a single section, vertical tabs are not displayed. In sections with a single subsection, horizontal tabs are not displayed.

```js
// The most minimal form possible
export default {
    id: <string>,
    title: <string>,
    sections: [
        {
            id: <string>,
            title: <string>,
            subsections: [
                {
                    id: <string>,
                    title: <string>,
                    fields: [
                        {
                            ...
                        }
                    ]
                }
            ]
        }
    ]
};
```

Have a look the [Simple Form](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/examples--simple-form) demo on storybook.

---

#### Form Definition Validation

Don't worry about making mistakes with your definition. If the `FormEngine` is instantiated with a malformed definition, the UI will be notified of the failure location.

In the case below, our definition was completely missing the `sections` array:

<div align="center">
<img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-demo/master/src/assets/form-engine-api-check.png' alt='api-check' aria-label='api-check' />
</div>

Have a look at the [Malformed Form](https://mikechabot.github.io/react-json-form-engine-demo/?path=/story/examples--malformed-form) demo on storybook.

----

### <a id="field-definition">Field Definition</a>

Field definitions also adhere to a strict schema. At minimum, they must contain an `id`, `type` and `title`:

```js
// The most minimal field object
{
  id: <string>,       // Uniquely identifies the field within the DOM, and FormEngine instance
  type: <string>,     // Determines the data type of the field response
  title: <string>     // Label of the field
}
```

----

### <a id="field-type">Field Type</a>

Determines the *data type* of the response value stored in the model, and which Default Control to render. To override the default and render an Allowed Control instead, use a [Field Decorator](#field-decorators).

Note, the `info` field is the only field type that does not accept input from the end-user; its purpose is to provide a place for the form author to render informational content, such as instructions, to the end-user. This field type utilizes `dangerouslySetInnerHTML` meaning you're able to render pure HTML. *Be aware of XSS concerns.*

| Field Type       | Default Control   | Allowed Controls                                          | Supports `options`? |
|------------------|-------------------|-----------------------------------------------------------|---------------------|
| `string`         | `<Text />`        | `<Password />`, `<Textarea />`, `<Select />`, `<Radio />` | Yes**               |
| `boolean`        | `<Checkbox />`    | `<Radio />`                                               | Yes**               |
| `number`         | `<Number />`      | `<Range />`                                               | No                  |
| `array`          | `<Select />`      | `<Checkboxgroup />`                                       | Yes                 |
| `date`           | `<DateTime />`    | N/A                                                       | No                  |
| `info`**         | `<section /> `    | N/A                                                       | No                  |

> ** Some field types will *automatically* transition from their Default Control to another Allowed Control if an `options` array is present in the field definition. (See [Field Type Transitions](#field-type-transitions)). However, in most cases, you must use a 
[Field Decorator](#field-decorators) to use another Allowed Control.

----

### <a id="field-children">Field Children</a>

Any field can contain child fields. Simply create a `fields` array on the field, and drop in valid [Field Definitions](#field-definition). Here's an example of some nested fields: 

> Note: Field children can recurse infinitely, and also be placed on [Field Options](#field-options).

```javascript
{
  id: "parent",
  type: "number",
  title: "Parent",             
  fields: [
    {
      id: "child",
      type: "string",
      title: "Child",
      fields: [
        {
          id: "grandchild",
          type: "number",
          title: "Grandchild"
        }
      ]
    },
    {
      id: "child-2",
      type: "array",
      title: "Child",
      options: [
        { id: 'op1', title: 'Option 1'},
        { id: 'op2', title: 'Option 2' },
      ]
    }
  ]
}
```

Have a look at the [Nested Fields](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/field-nesting--simple-nesting) demo on storybook.

----

### <a id="field-options">Field Options</a>

> Applies to `string`, `boolean`, and `array` field types only.

#### `boolean`

Fields of type `boolean` only accept a maximum of **two** options; each of which should contain just a `title` property. The first option is considered the affirmative response:

```
{
  id: 'my_bool',
  title: 'How often does it occur?',
  type: 'boolean',
  options: [
    { title: 'Always' },
    { title: 'Never' },
  ]
}
```

#### `string` / `array`

For field types that accept unlimited options (`string`, `array`), you must include both an `id` and `title`. The `ids` of the selected option(s) are stored in the model.

```js
{
  id: 'my_arr',
  title: 'Pick some',  
  type: 'array',      // Array type allows for multiple selections
  options: [
    { id: "op1", title: "Option 1" },
    { id: "op2", title: "Option 2" },
    { id: "op3", title: "Option 3" },
  ]
},
{
  id: 'my_str',
  title: 'Pick one',
  type: 'string',    // String type allows for single selection
  options: [
    { id: "op1", title: "Option 1" },
    { id: "op2", title: "Option 2" },
    { id: "op3", title: "Option 3" },
  ]
}
```

#### Field Children on Options

For field controls that render selectable options, like `<Radio />` or `<Checkboxgroup />`, you can include [Field Children](#field-children) on any of the options:

```javascript
{
  id: "field_2",
  type: "string",
  title: "Select One (Field Type: String)",
  options: [
    {
      id: "op1",
      title: "Option 1",
      fields: [{ id: "explain_1", type: "string", title: "Explain" }]
    },
    {
      id: "op2",
      title: "Option 2",
      fields: [{ id: "explain_2", type: "string", title: "Explain" }]
    },
    {
      id: "op3",
      title: "Option 3",
      fields: [{ id: "explain_3", type: "string", title: "Explain" }]
    }
  ]
}
```

----

### <a id="field-props-list">Field Props List</a>

Here's the complete list of props that can be passed to [Field Definitions](#field-definition):

| Property        | Type      | Required | Description                                                                                 |
|-----------------|-----------|----------|---------------------------------------------------------------------------------------------|
| `id`            | `string`  | Yes      | See [Field ID](#field-id)                                                                   |
| `type`          | `string`  | Yes      | See [Field Type](#field-type)                                                               |
| `title`         | `string`  | Yes      | Display label for the field                                                                 |
| `options`       | `array`   | No       | See [Field Options](#field-options)                                                         |
| `fields`        | `array`   | No       | See [Field Children](#field-children)                                                       |
| `placeholder`   | `string`  | No       | Placeholder text to display                                                                 |
| `showCondition` | `object`  | No       | Condition object (See [Conditions](#conditions))                                            |
| `required`      | `boolean` | No       | Whether the field is required (See [Validation](#validation))                               |
| `pattern`       | `string`  | No       | Pattern to match during validation (See [Validation](#validation))                          |
| `min`           | `number`  | Yes*     | Minimum value. (Used for `number` field types)                                              |
| `max`           | `number`  | Yes*     | Maximum value. (Used for `number` field types)                                              |
| `hideTime`      | `boolean` | No       | Only show the Date in Date/Time. (Used for `date` field types)                              |
| `hideCalendar`  | `boolean` | No       | Only show the Time in Data/Time. (Used for `date` field types)                              |
| `content`  | `string` | No       | Informational content to be displayed to the end-user. Utilizes `dangerouslySetInnerHTML`. (Used for `info` field types)                              |

> `min` and `max` are only required for `<Range />` component types.

----

### <a id="field-type-transitions">Field Type Transitions</a>

#### `string`

By default, a `string` field is rendered as `<Text />` (See [Field Type](#field-type)), but with `options` it automatically renders as a `<Select />`.

```js
[
  { 
    // Renders as <Text />
    id: 'field_1',
    type: 'string', 
    title: 'Text Field'
  },
  {             
    // Renders as <Select />
    id: 'field_2',
    type: 'string',
    title: 'Select Field',
    options: [
      { id: "op1", title: "Option 1" },
      { id: "op2", title: "Option 2" },
    ]
  }
]
```

Have a look at the [Strings](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/data-types--strings) demo on storybook.

----

#### `boolean`

By default, a `boolean` field is rendered as `<Checkbox />` (See [Field Type](#field-type)), but with `options` it automatically renders as a `<Radio />`.

```js
[
  {
    id: "field_1",
    type: "boolean",
    title: "Checkbox Field"
  },
  {
    id: "field_2",
    type: "boolean",
    title: "Radio Field",
    options: [
      { title: "Yes" },
      { title: "No" }
    ]
  }
]
```

> A maximum of two (2) options is allowed for `boolean` fields. For unlimited `<Radio />` options, use the `string` type with a `component` of `radio`.

Have a look at the [Booleans](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/data-types--booleans) demo on storybook.

----

### <a id="field-decorators">Field Decorators</a> 

Field decorators contain metadata about the fields you've configured in your form definition. Add the `decorators` object to the root of the [Form Definition](#form-definition):

```js
  {
    id: 'my_form'
    title: 'My Form',
    sections: [...],
    decorators: {}
  }
```
The `decorators` object will be keyed by [Field ID](#field-id), and can contain the properties `hint` and `component`.

----

#### Hint Decorator

Add hint text to any field:

```js
  id: "Form_ID",
  title: "Form Title",
  sections: [{
    ...
    subsections: [{
      ...     
      fields: [{
        id: "field_1",
        type: "string",
        title: "Field title"
      }]
    }]
  }],
  decorators: {
    field_1: {
      hint: "This is some hint text!"   // Add hint text to any field
    }
  }
}
```

----

#### Component Decorator

Every field `type` renders a Default Control (See [Field Type](#field-type)), however you'll often want to explicitly override the default component type in favor of another. In some cases, this occurs automatically (See [Field Type Transitions](#field-type-transitions)), however most times you'll need to specify a component decorator.

Let's update `field_1` from a `<Select />` to a `<Checkboxgroup />`:

```js
  id: "Form_ID",
  title: "Form Title",
  sections: [{
    ...
    subsections: [{
      ...     
      fields: [{
        id: "field_1",
        type: "array",
        title: "Field title",
        options: [
           ...
        ]
      }]
    }]
  }],
  decorators: {
    field_1: {
      hint: 'More hint text!',
      component: {
        type: 'checkboxgroup'   // Override the default component type
      }
    }
  }
}
```

Here's a list of field types with overrideable components:

| Field Type       | Component Decorator Overrides   | 
|------------------|---------------------------------|
| `string`         | `password`, `textarea`, `radio` |
| `number`         | `range`                         |  
| `array`          | `checkboxgroup`                 |


Take a look at a component override in the [Arrays](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/data-types--arrays) demo.

----

## <a id="validation">Validation</a>

Three types of validation are supported.

| Type               | Supported Data Types    |
|--------------------|-------------------------|
| Required           | All                     |
| Numeric (min/max)  | `number`                | 
| Regular Expression | `string`, `number`      |

Take a look at the [Validation](http://localhost:6006/?path=/story/validations--required-validation) demos on storybook.

----

### Required

Add `required: true` to any field definition:

```js
{
    id: 'username',
    type: 'string',
    title: 'Username',
    required: true
},
{
    id: 'myOptions',
    type: 'array',
    title: 'Option Group',
    required: true,
    options: [
        { id: 'op1', title: 'Option 1' },
        { id: 'op2', title: 'Option 2' },
        { id: 'op3', title: 'Option 3' },
        { id: 'op4', title: 'Option 4' }
    ]
}
```
> Note: Fields are **only** validated if they are visible in the DOM. For instance, if a field's `showCondition` (See [Conditions](#conditions)) is not met, it will not be displayed to the end-user; conditionally hidden fields are not validated.

Take a look at the [Required Validation](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/validations--required-validation) demo in storybook.

----

### Numeric

Add `min: <number>` or `max: <number>` or both to any `number` type field.

```js
{
    id: 'age',
    type: 'number',
    title: 'Age',
    min: 0,
    max: 120
}
```
> Note `min`/`max` values are only validated once the field is marked as dirty, that is, the user inputs a value.

Take a look at the [Numeric Validation](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/validations--numeric-validation) demo on storybook.

----

### Regular Expression

Add `pattern: <regex>` to any `string` or `number` field.

```js
{
    id: 'myRegEx',
    type: 'string',
    title: 'My Field',
    pattern: '^foobar$',
}
```

Take a look at the [Regex Demo](https://mikechabot.github.io/react-json-form-engine-storybook/?path=/story/validations--regex-validation) on storybook.

----

### Multiple Validators

Conditions can be combined. The following `number` field will only pass validation if the following conditions are met:

1. The value is not `undefined`, per `required`.
1. The value is greater-than or equal to zero, per `min`.
1. The value is less-than or equal to 300, per `max`.
1. The value starts with the numeral `3`, per `pattern`.

```js
{
    id: 'num1',
    type: 'number',
    title: 'Number Regex',
    pattern: '^3',
    required: true,
    min: 0,
    max: 300
}
```

----

## <a id="conditions">Conditions</a>

Coming soon!

## <a id="serialize">Serialize</a>

Easily serialize the form's responses by calling `serializeModel` on the instance:

```js
const json = instance.serializeModel();
```
To access the model without serialization, use the below:
```js
const map = instance.getModel();           // {fooId: 'bar', bazId: 'qux'}
const array = instance.getModelAsArray();  // [{fooId: 'bar'}, {bazId: 'qux'}]
```
