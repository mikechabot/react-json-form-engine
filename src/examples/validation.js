export default {
    id: 'VALIDATION',
    title: 'Validation',
    faIcon: {
        name: 'asterisk'
    },
    sections: [
        {
            id: 'Required-Section',
            title: 'Required',
            subsections: [
                {
                    id: 'Required-Subsection',
                    title: 'Make any field required',
                    subtitle: 'Only display errors once a field is marked as dirty',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'Text field',
                            required: true,
                            fields: [
                                {
                                    id: 'str2',
                                    type: 'string',
                                    title: 'Required Child',
                                    required: true
                                }
                            ]
                        },
                        {
                            id: 'array1',
                            type: 'array',
                            title: 'Multiselect',
                            required: true,
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' },
                                { id: 'op4', title: 'Option 4' }
                            ]
                        },
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field',
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            id: 'Numeric-Section',
            title: 'Numeric',
            subsections: [
                {
                    id: 'Numeric-Subsection',
                    title: 'Min/max validation supported',
                    subtitle: 'Display an error if out-of-range',
                    fields: [
                        {
                            id: 'num2',
                            type: 'number',
                            title: 'Number field',
                            min: 0,
                            max: 5
                        }
                    ]
                }
            ]
        },
        {
            id: 'Regex-Section',
            title: 'Regex',
            subsections: [
                {
                    id: 'Regex-Subsection',
                    title: 'Add a Regex to any String field',
                    subtitle: 'Useful for validating emails, URLS, etc.',
                    fields: [
                        {
                            id: 'str3',
                            type: 'string',
                            title: 'Satisfy the condition by typing "foobar!" (no quotes)',
                            pattern: '^foobar!$',
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        str1: {
            hint: 'Enter some text, then delete it.'
        },
        str2: {
            hint: 'Breadcrumbs to the parent appear in Validation Messages'
        },
        array1: {
            hint: 'Select, then deselect an option.',
            component: {
                type: 'checkboxgroup'
            }
        },
        num1: {
            hint: 'Try entering some text'
        },
        num2: {
            hint: 'Min: 0, Max: 5. Try entering a value outside the range.'
        },
        str3: {
            hint: 'This field is also required, try entering some text, and then removing it.'
        }
    }
};
