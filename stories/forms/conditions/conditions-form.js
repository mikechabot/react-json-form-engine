export default {
    id: 'conditionsForm',
    title: 'Basic Conditions',
    faIcon: {
        name: 'code'
    },
    sections: [
        {
            id: 'conditionsSection',
            title: 'Conditions',
            subsections: [
                {
                    id: 'conditionsSubsection',
                    title: 'Conditions',
                    subtitle: 'Conditionally hide & show fields based on the state of the Model',
                    fields: [
                        {
                            id: 'bool1',
                            type: 'boolean',
                            title: 'Show children?',
                            options: [
                                {
                                    title: 'Yes',
                                    fields: [
                                        {
                                            id: 'arr1',
                                            type: 'array',
                                            title: 'Child 1',
                                            options: [
                                                {
                                                    id: 'op1',
                                                    title: 'Option 1',
                                                    fields: [
                                                        {
                                                            id: 'str1',
                                                            type: 'string',
                                                            title: 'Grandchild',
                                                            showCondition: {
                                                                type: 'CONTAINS',
                                                                expressions: [
                                                                    {
                                                                        type: 'FORM_RESPONSE',
                                                                        id: 'arr1'
                                                                    },
                                                                    {
                                                                        type: 'CONST',
                                                                        value: 'op1'
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            id: 'str2',
                                                            type: 'string',
                                                            title: 'Grandchild',
                                                            showCondition: {
                                                                type: 'CONTAINS',
                                                                expressions: [
                                                                    {
                                                                        type: 'FORM_RESPONSE',
                                                                        id: 'arr1'
                                                                    },
                                                                    {
                                                                        type: 'CONST',
                                                                        value: 'op1'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'op2',
                                                    title: 'Option 2',
                                                    fields: [
                                                        {
                                                            id: 'num1',
                                                            type: 'number',
                                                            title: 'Grandchild',
                                                            min: -20,
                                                            max: 20,
                                                            showCondition: {
                                                                type: 'CONTAINS',
                                                                expressions: [
                                                                    {
                                                                        type: 'FORM_RESPONSE',
                                                                        id: 'arr1'
                                                                    },
                                                                    {
                                                                        type: 'CONST',
                                                                        value: 'op2'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            showCondition: {
                                                type: 'EQUAL',
                                                expressions: [
                                                    {
                                                        type: 'FORM_RESPONSE',
                                                        id: 'bool1'
                                                    },
                                                    {
                                                        type: 'CONST',
                                                        value: true
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            id: 'num2',
                                            type: 'number',
                                            title: 'Child 2',
                                            min: 0,
                                            max: 10,
                                            showCondition: {
                                                type: 'EQUAL',
                                                expressions: [
                                                    {
                                                        type: 'FORM_RESPONSE',
                                                        id: 'bool1'
                                                    },
                                                    {
                                                        type: 'CONST',
                                                        value: true
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                { title: 'No' }
                            ]
                        },
                        {
                            id: 'str3',
                            type: 'string',
                            title: 'This field will be hidden if "Yes" is selected above',
                            placeholder: 'Enter some text to show child',
                            showCondition: {
                                type: 'EQUAL',
                                not: true,
                                expressions: [
                                    {
                                        type: 'FORM_RESPONSE',
                                        id: 'bool1'
                                    },
                                    {
                                        type: 'CONST',
                                        value: true
                                    }
                                ]
                            },
                            fields: [
                                {
                                    id: 'bool2',
                                    type: 'boolean',
                                    title: 'Field',
                                    options: [{ title: 'True' }, { title: 'False' }],
                                    inline: true,
                                    showCondition: {
                                        type: 'BLANK',
                                        not: true,
                                        expression: {
                                            type: 'FORM_RESPONSE',
                                            id: 'str3'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            id: 'str4',
                            type: 'string',
                            title: 'Another String Field',
                            showCondition: {
                                type: 'CONTAINS',
                                expressions: [
                                    {
                                        type: 'FORM_RESPONSE',
                                        id: 'arr1'
                                    },
                                    {
                                        type: 'CONST',
                                        value: 'op1'
                                    }
                                ]
                            }
                        },
                        {
                            id: 'date1',
                            type: 'date',
                            title: 'Select a date',
                            fields: [
                                {
                                    id: 'str5',
                                    type: 'string',
                                    title: 'Field',
                                    showCondition: {
                                        type: 'BLANK',
                                        not: true,
                                        expression: {
                                            type: 'FORM_RESPONSE',
                                            id: 'date1'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        arr1: {
            component: {
                type: 'checkboxgroup'
            }
        },
        num1: {
            component: {
                type: 'range'
            }
        }
    }
};
