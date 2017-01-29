export default {
    id      : 'RELATIONSHIPS',
    title   : 'Relationships',
    sections: [
        {
            id         : 'Parent-Child',
            title      : 'Parent/Child',
            subsections: [
                {
                    id      : 'Simple-Subsection',
                    title   : 'Simple',
                    subtitle: 'Simple parent/child fields',
                    fields  : [
                        {
                            id    : 'str1',
                            type  : 'string',
                            title : 'Parent 1',
                            fields: [
                                {
                                    id   : 'str2',
                                    type : 'string',
                                    title: 'Child 1.1'
                                },
                                {
                                    id   : 'str3',
                                    type : 'string',
                                    title: 'Child 1.2'
                                }
                            ]
                        },
                        {
                            id    : 'str4',
                            type  : 'string',
                            title : 'Parent 2',
                            fields: [
                                {
                                    id   : 'str5',
                                    type : 'string',
                                    title: 'Child 2.1'
                                },
                                {
                                    id   : 'str6',
                                    type : 'string',
                                    title: 'Child 2.2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id      : 'Complex-Subsection',
                    title   : 'Complex',
                    subtitle: 'Use any combination of fields to create infinite parent/child relationships',
                    fields  : [
                        {
                            id     : 'bool1',
                            type   : 'boolean',
                            title  : 'Parent 1',
                            inline : true,
                            options: [{ title: 'Yes' }, { title: 'No' }],
                            fields : [
                                {
                                    id    : 'str7',
                                    type  : 'string',
                                    title : 'Child 1.1',
                                    fields: [
                                        {
                                            id     : 'arr1',
                                            type   : 'array',
                                            title  : 'Grandchild 1.1.1',
                                            options: [
                                                { id: 0, title: 'Option 1' },
                                                { id: 1, title: 'Option 2' }
                                            ],
                                            fields: [
                                                {
                                                    id     : 'bool2',
                                                    type   : 'boolean',
                                                    title  : 'Great-Grandchild 1.1.1.1',
                                                    options: [{ title: 'True' }, { title: 'False' }],
                                                    inline : true,
                                                    fields : [
                                                        {
                                                            id   : 'str8',
                                                            type : 'string',
                                                            title: 'Great-Great-Grandchild 1.1.1.1.1'
                                                        },
                                                        {
                                                            id   : 'str9',
                                                            type : 'string',
                                                            title: 'Great-Great-Grandchild 1.1.1.1.2'
                                                        }
                                                    ]
                                                },
                                                {
                                                    id   : 'num1',
                                                    type : 'number',
                                                    title: 'Great-Grandchild 1.1.1.2',
                                                    min  : 10,
                                                    max  : 20
                                                }
                                            ]
                                        },
                                        {
                                            id   : 'num2',
                                            type : 'number',
                                            title: 'Grandchild 1.1.2'
                                        }
                                    ]
                                },
                                {
                                    id    : 'str10',
                                    type  : 'string',
                                    title : 'Child 1.2',
                                    fields: [
                                        {
                                            id     : 'arr2',
                                            type   : 'array',
                                            title  : 'Grandchild 1.2.1',
                                            options: [
                                                { id: 0, title: 'Option 1' },
                                                { id: 1, title: 'Option 2' },
                                                { id: 2, title: 'Option 3' },
                                                { id: 3, title: 'Option 4' }
                                            ]
                                        },
                                        {
                                            id   : 'num3',
                                            type : 'number',
                                            title: 'Grandchild 1.2.2'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id    : 'str11',
                            type  : 'string',
                            title : 'Parent 2',
                            fields: [
                                {
                                    id    : 'bool3',
                                    type  : 'boolean',
                                    title : 'Child 2.1',
                                    fields: [
                                        {
                                            id   : 'str12',
                                            type : 'string',
                                            title: 'Grandchild 2.1.1'
                                        },
                                        {
                                            id   : 'str13',
                                            type : 'string',
                                            title: 'Grandchild 2.1.2'
                                        }
                                    ]
                                },
                                {
                                    id    : 'bool4',
                                    type  : 'boolean',
                                    title : 'Child 2.2',
                                    fields: [
                                        {
                                            id   : 'str14',
                                            type : 'string',
                                            title: 'Grandchild 2.2.1'
                                        },
                                        {
                                            id   : 'str15',
                                            type : 'string',
                                            title: 'Grandchild 2.2.2'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id         : 'Conditions-Section',
            title      : 'Conditions',
            subsections: [
                {
                    id      : 'Simple-Condition-Subsection',
                    title   : 'Simple',
                    subtitle: 'Conditionally show or hide fields based on model data',
                    fields  : [
                        {
                            id     : 'bool5',
                            type   : 'boolean',
                            title  : 'Show child fields?',
                            options: [{ title: 'Yes' }, { title: 'No' }],
                            fields : [
                                {
                                    id     : 'arr6',
                                    type   : 'array',
                                    title  : 'Checkbox group',
                                    options: [
                                        { id: 0, title: 'Option 1' },
                                        { id: 1, title: 'Option 2' },
                                        { id: 2, title: 'Option 3' },
                                        { id: 3, title: 'Option 4' }
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
                        {
                            id           : 'str17',
                            type         : 'string',
                            title        : 'Hide me if "Yes" is selected above',
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
                                    id           : 'str20',
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
                },
                {
                    id    : 'Array-Condition-Subsection',
                    title : 'Arrays',
                    fields: [
                        {
                            id     : 'arr3',
                            type   : 'array',
                            title  : 'Conditionally display fields under option fields',
                            options: [
                                {
                                    id    : 0,
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
                                                    value: '0'
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
                                    id    : 1,
                                    title : 'Option 2',
                                    fields: [
                                        {
                                            id           : 'str18',
                                            type         : 'string',
                                            title        : 'Conditional field',
                                            showCondition: {
                                                type       : 'CONTAINS',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: '1'
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
                                    id    : 2,
                                    title : 'Option 3',
                                    fields: [
                                        {
                                            id           : 'bool7',
                                            type         : 'boolean',
                                            title        : 'Conditional field',
                                            showCondition: {
                                                type       : 'CONTAINS',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: '2'
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
                                    id    : 3,
                                    title : 'Option 4',
                                    fields: [
                                        {
                                            id     : 'arr4',
                                            type   : 'array',
                                            title  : 'Conditional field',
                                            options: [
                                                {id: 0, title: 'Option 1'},
                                                {id: 1, title: 'Option 2'},
                                                {id: 2, title: 'Option 3'},
                                                {id: 3, title: 'Option 4'}
                                            ],
                                            showCondition: {
                                                type       : 'CONTAINS',
                                                expression1: {
                                                    type : 'CONST',
                                                    value: '3'
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
                                { id: '0', title: 'Option 1' },
                                { id: '1', title: 'Option 2' },
                                { id: '2', title: 'Option 3' }
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
                },
                {
                    id      : 'Numeric-Condition-Subsection',
                    title   : 'Numeric',
                    subtitle: 'Number fields support simple expressions',
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
        num1: {
            component: {
                type: 'range'
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
        str13: {
            component: {
                type: 'textarea'
            }
        }
    }
};
