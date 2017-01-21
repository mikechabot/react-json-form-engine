export default {
    id    : 'VALIDATION',
    title : 'Validation',
    schema: {
        sections: [
            {
                id         : 1,
                title      : 'Required',
                subsections: [
                    {
                        title   : 'Make any field required',
                        subtitle: 'By default, only display the error notification once field is "dirty".',
                        id      : 2,
                        fields  : {
                            str1: {
                                tag     : 'str1',
                                type    : 'string',
                                title   : 'Text field',
                                required: true
                            },
                            array1: {
                                tag     : 'array1',
                                type    : 'array',
                                title   : 'Multiselect',
                                required: true,
                                options : [
                                    { id: 0, title: 'Option 1' },
                                    { id: 1, title: 'Option 2' },
                                    { id: 2, title: 'Option 3' },
                                    { id: 3, title: 'Option 4' }
                                ]
                            },
                            num1: {
                                tag     : 'num1',
                                type    : 'number',
                                title   : 'Number field',
                                required: true
                            }
                        }
                    }
                ]
            },
            {
                title      : 'Numeric',
                id         : 3,
                subsections: [{
                    id    : 4,
                    title : 'Min/max validation supported',
                    fields: {
                        num2: {
                            tag  : 'num2',
                            type : 'number',
                            title: 'Number field',
                            min  : 0,
                            max  : 5
                        }
                    }
                }]
            },
            {
                title      : 'Regex',
                id         : 5,
                subsections: [{
                    id    : 6,
                    title : 'Add a regex pattern to any field',
                    fields: {
                        str2: {
                            tag    : 'str2',
                            type   : 'string',
                            title  : 'Using regex pattern: "^Regex!$"',
                            pattern: '^Regex!$'
                        }
                    }
                }]
            }
        ]
    },
    uiSchema: {
        str1: {
            hint: 'Enter some text, then delete it.'
        },
        array1: {
            component: {
                type: 'checkboxgroup'
            }
        },
        num2: {
            hint: 'Min: 0, Max: 5. Try entering a value outside the range.'
        },
        str2: {
            hint: 'Satisfy the condition by entering "Regex!"'
        }
    },
    calcExpressionMap     : {},
    calcTriggerMap        : {},
    defaultValueTriggerMap: {}
};
