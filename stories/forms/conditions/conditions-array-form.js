export default {
    id: 'arrayConditions',
    title: 'Array Conditions Form',
    faIcon: {
        name: 'code'
    },
    sections: [
        {
            id: 'conditionsSection',
            title: 'Arrays',
            subsections: [
                {
                    id: 'conditionsSubsection',
                    title: 'Array Conditions',
                    subtitle: 'Display children under option fields.',
                    fields: [
                        {
                            id: 'arr1',
                            type: 'array',
                            title: 'Select some options to display the children',
                            options: [
                                {
                                    id: 'op1',
                                    title: 'Option 1',
                                    fields: [
                                        {
                                            id: 'num1',
                                            type: 'number',
                                            title: 'Field',
                                            min: 0,
                                            max: 5,
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
                                            id: 'arr2',
                                            type: 'array',
                                            title: 'Field',
                                            options: [
                                                {
                                                    id: 'op1',
                                                    title: 'Option 1'
                                                },
                                                {
                                                    id: 'op2',
                                                    title: 'Option 2'
                                                }
                                            ],
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
                                },
                                {
                                    id: 'op3',
                                    title: 'Option 3',
                                    fields: [
                                        {
                                            id: 'bool1',
                                            type: 'boolean',
                                            title: 'Field',
                                            inline: true,
                                            options: [
                                                {
                                                    title: 'Option 1'
                                                },
                                                {
                                                    title: 'Option 2'
                                                }
                                            ],
                                            showCondition: {
                                                type: 'CONTAINS',
                                                expression1: {
                                                    type: 'CONST',
                                                    value: 'op3'
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
                                    id: 'op4',
                                    title: 'Option 4',
                                    fields: [
                                        {
                                            id: 'arr3',
                                            type: 'array',
                                            title: 'Field',
                                            options: [
                                                { id: 'op1', title: 'Option 1' },
                                                { id: 'op2', title: 'Option 2' },
                                                { id: 'op3', title: 'Option 3' },
                                                { id: 'op4', title: 'Option 4' }
                                            ],
                                            showCondition: {
                                                type: 'CONTAINS',
                                                expression1: {
                                                    type: 'CONST',
                                                    value: 'op4'
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id: 'arr1'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'arr5',
                            type: 'array',
                            title: 'Show child regardless of the option(s) selected',
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' },
                                { id: 'op4', title: 'Option 4' }
                            ],
                            fields: [
                                {
                                    id: 'num2',
                                    type: 'number',
                                    title: 'Child',
                                    showCondition: {
                                        type: 'EMPTY',
                                        not: true,
                                        expression: {
                                            type: 'FORM_RESPONSE',
                                            id: 'arr5'
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
        arr2: {
            component: {
                type: 'checkboxgroup'
            }
        },
        bool1: {
            component: {
                type: 'radio'
            }
        },
        num1: {
            component: {
                type: 'range'
            }
        }
    }
};
