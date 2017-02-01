export default {
    id      : 'Conditions-Section',
    title   : 'Conditions',
    sections: [
        {
            id         : 'Condition-Section',
            title      : 'Conditions',
            subsections: [
                {
                    id      : 'Condition-Subsection',
                    title   : 'Conditions',
                    subtitle: 'Conditionally show or hide fields based on form response',
                    fields  : [
                        {
                            id     : 'bool5',
                            type   : 'boolean',
                            title  : 'Show my two child fields?',
                            options: [
                                {
                                    title : 'Yes',
                                    fields: [
                                        {
                                            id     : 'arr6',
                                            type   : 'array',
                                            title  : 'My first two options have children',
                                            options: [
                                                {
                                                    id    : 'op1',
                                                    title : 'Option 1',
                                                    fields: [
                                                        {
                                                            id           : 'str20',
                                                            type         : 'string',
                                                            title        : 'Yet another field',
                                                            showCondition: {
                                                                type       : 'CONTAINS',
                                                                expression1: {
                                                                    type : 'CONST',
                                                                    value: 'op1'
                                                                },
                                                                expression2: {
                                                                    type: 'FORM_RESPONSE',
                                                                    id  : 'arr6'
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    id    : 'op2',
                                                    title : 'Option 2',
                                                    fields: [
                                                        {
                                                            id           : 'num10',
                                                            type         : 'number',
                                                            title        : 'And more',
                                                            showCondition: {
                                                                type       : 'CONTAINS',
                                                                expression1: {
                                                                    type : 'CONST',
                                                                    value: 'op2'
                                                                },
                                                                expression2: {
                                                                    type: 'FORM_RESPONSE',
                                                                    id  : 'arr6'
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                { id: 'op3', title: 'Option 3' },
                                                { id: 'op4', title: 'Option 4' }
                                            ],
                                            showCondition: {
                                                type       : 'EQUAL',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: true
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id  : 'bool5'
                                                }
                                            }
                                        },
                                        {
                                            id           : 'num9',
                                            type         : 'number',
                                            title        : 'Conditional field',
                                            min          : 0,
                                            max          : 10,
                                            showCondition: {
                                                type       : 'EQUAL',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: true
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id  : 'bool5'
                                                }
                                            }
                                        }
                                    ]
                                },
                                { title: 'No' }
                            ]

                        },
                        {
                            id           : 'str17',
                            type         : 'string',
                            title        : 'I will be hidden if "Yes" is selected above!',
                            placeholder  : 'Enter some text to show child',
                            showCondition: {
                                type       : 'EQUAL',
                                not        : true,
                                expression1: {
                                    type : 'CONST',
                                    value: true
                                },
                                expression2: {
                                    type: 'FORM_RESPONSE',
                                    id  : 'bool5'
                                }
                            },
                            fields: [
                                {
                                    id           : 'bool6',
                                    type         : 'boolean',
                                    title        : 'Conditional field',
                                    options      : [{ title: 'True' }, { title: 'False' }],
                                    inline       : true,
                                    showCondition: {
                                        type      : 'BLANK',
                                        not       : true,
                                        expression: {
                                            type: 'FORM_RESPONSE',
                                            id  : 'str17'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            id    : 'date1',
                            type  : 'date',
                            title : 'Select a date',
                            fields: [
                                {
                                    id           : 'str22',
                                    type         : 'string',
                                    title        : 'Conditional field',
                                    showCondition: {
                                        type      : 'BLANK',
                                        not       : true,
                                        expression: {
                                            type: 'FORM_RESPONSE',
                                            id  : 'date1'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id         : 'Array-Condition-Section',
            title      : 'Arrays',
            subsections: [
                {
                    id      : 'Array-Condition-Subsection',
                    title   : 'Array Conditions',
                    subtitle: 'Display children under option fields.',
                    fields  : [
                        {
                            id     : 'arr3',
                            type   : 'array',
                            title  : 'Click the options to display the children',
                            options: [
                                {
                                    id    : 'op1',
                                    title : 'Option 1',
                                    fields: [
                                        {
                                            id           : 'num4',
                                            type         : 'number',
                                            title        : 'Conditional field',
                                            showCondition: {
                                                type       : 'CONTAINS',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: 'op1'
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id  : 'arr3'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    id    : 'op2',
                                    title : 'Option 2',
                                    fields: [
                                        {
                                            id     : 'arr7',
                                            type   : 'array',
                                            title  : 'Conditional field',
                                            options: [
                                                {
                                                    id   : 'op1',
                                                    title: 'Option 1'
                                                },
                                                {
                                                    id   : 'op2',
                                                    title: 'Option 2'
                                                }
                                            ],
                                            showCondition: {
                                                type       : 'CONTAINS',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: 'op2'
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id  : 'arr3'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    id    : 'op3',
                                    title : 'Option 3',
                                    fields: [
                                        {
                                            id     : 'bool7',
                                            type   : 'boolean',
                                            title  : 'Conditional field',
                                            inline : true,
                                            options: [
                                                {
                                                    title: 'Option 1'
                                                },
                                                {
                                                    title: 'Option 2'
                                                }
                                            ],
                                            showCondition: {
                                                type       : 'CONTAINS',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: 'op3'
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id  : 'arr3'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    id    : 'op4',
                                    title : 'Option 4',
                                    fields: [
                                        {
                                            id     : 'arr4',
                                            type   : 'array',
                                            title  : 'Conditional field',
                                            options: [
                                                {id: 'op1', title: 'Option 1'},
                                                {id: 'op2', title: 'Option 2'},
                                                {id: 'op3', title: 'Option 3'},
                                                {id: 'op4', title: 'Option 4'}
                                            ],
                                            showCondition: {
                                                type       : 'CONTAINS',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: 'op4'
                                                },
                                                expression2: {
                                                    type: 'FORM_RESPONSE',
                                                    id  : 'arr3'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id     : 'arr5',
                            type   : 'array',
                            title  : 'Show a child regardless of the option(s) selected',
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' }
                            ],
                            fields: [
                                {
                                    id           : 'num7',
                                    type         : 'number',
                                    title        : 'Conditional field',
                                    showCondition: {
                                        type      : 'EMPTY',
                                        not       : true,
                                        expression: {
                                            type: 'FORM_RESPONSE',
                                            id  : 'arr5'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id         : 'Numeric-Condition-Subsection',
            title      : 'Numeric',
            subsections: [
                {
                    id      : 'Numeric-Condition-Subsection',
                    title   : 'Numeric',
                    subtitle: 'Simple numeric expressions supported!',
                    fields  : [
                        {
                            id    : 'num5',
                            type  : 'number',
                            title : 'Greater than (>)',
                            min   : 0,
                            max   : 10,
                            fields: [
                                {
                                    id           : 'str19',
                                    type         : 'string',
                                    title        : 'Conditional field',
                                    showCondition: {
                                        type       : 'GREATER_THAN',
                                        expression1: {
                                            type: 'FORM_RESPONSE',
                                            id  : 'num5'
                                        },
                                        expression2: {
                                            type : 'CONST',
                                            value: 5
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            id    : 'num8',
                            type  : 'number',
                            title : 'Less than (<)',
                            fields: [
                                {
                                    id           : 'str21',
                                    type         : 'string',
                                    title        : 'Conditional field',
                                    showCondition: {
                                        type       : 'LESS_THAN',
                                        expression1: {
                                            type: 'FORM_RESPONSE',
                                            id  : 'num8'
                                        },
                                        expression2: {
                                            type : 'CONST',
                                            value: 5
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
        arr3: {
            component: {
                type: 'checkboxgroup'
            }
        },
        arr6: {
            component: {
                type: 'checkboxgroup'
            }
        },
        arr7: {
            component: {
                type: 'checkboxgroup'
            }
        },
        bool7: {
            component: {
                type: 'radio'
            }
        },
        num4: {
            component: {
                type: 'range'
            }
        },
        num5: {
            hint     : 'Show field if > 5',
            component: {
                type: 'range'
            }
        },
        num8: {
            hint: 'Show field if < 5'
        },
        num9: {
            component: {
                type: 'range'
            }
        },
        num10: {
            component: {
                type: 'range'
            }
        }
    }
};
