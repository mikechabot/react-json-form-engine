export default {
    id: 'conditionsForm',
    title: 'Conditions Form',
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
                                                                expression1: {
                                                                    type: 'CONST',
                                                                    value: 'op1'
                                                                },
                                                                expression2: {
                                                                    type: 'FORM_RESPONSE',
                                                                    id: 'arr1'
                                                                }
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
                                                                expression1: {
                                                                    type: 'CONST',
                                                                    value: 'op2'
                                                                },
                                                                expression2: {
                                                                    type: 'FORM_RESPONSE',
                                                                    id: 'arr1'
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            showCondition: {
                                                type: 'EQUAL',
                                                expression1: {
                                                    type: 'CONST',
                                                    value: true
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id: 'bool1'
                                                }
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
                                                expression1: {
                                                    type: 'CONST',
                                                    value: true
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id: 'bool1'
                                                }
                                            }
                                        }
                                    ]
                                },
                                { title: 'No' }
                            ]
                        },
                        {
                            id: 'str2',
                            type: 'string',
                            title: 'This field will be hidden if "Yes" is selected above',
                            placeholder: 'Enter some text to show child',
                            showCondition: {
                                type: 'EQUAL',
                                not: true,
                                expression1: {
                                    type: 'CONST',
                                    value: true
                                },
                                expression2: {
                                    type: 'FORM_RESPONSE',
                                    id: 'bool1'
                                }
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
                                            id: 'str2'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            id: 'date1',
                            type: 'date',
                            title: 'Select a date',
                            fields: [
                                {
                                    id: 'str2',
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
