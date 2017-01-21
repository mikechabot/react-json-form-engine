export default {
    id    : 'RELATIONSHIPS',
    title : 'Relationships',
    schema: {
        sections: [
            {
                title      : 'Parent/Child',
                subsections: [
                    {
                        title   : 'Simple',
                        subtitle: 'Simple parent/child fields',
                        fields  : {
                            str1: {
                                tag   : 'str1',
                                type  : 'string',
                                title : 'Parent 1',
                                fields: {
                                    str2: {
                                        tag  : 'str2',
                                        type : 'string',
                                        title: 'Child 1.1'
                                    },
                                    str3: {
                                        tag  : 'str3',
                                        type : 'string',
                                        title: 'Child 1.2'
                                    }
                                }
                            },
                            str4: {
                                tag   : 'str4',
                                type  : 'string',
                                title : 'Parent 2',
                                fields: {
                                    str5: {
                                        tag  : 'str5',
                                        type : 'string',
                                        title: 'Child 2.1'
                                    },
                                    str6: {
                                        tag  : 'str6',
                                        type : 'string',
                                        title: 'Child 2.2'
                                    }
                                }
                            }
                        }
                    },
                    {
                        title   : 'Complex',
                        subtitle: 'Use any combination of fields to create infinite parent/child relationships',
                        fields  : {
                            bool1: {
                                tag    : 'bool1',
                                type   : 'boolean',
                                title  : 'Parent 1',
                                inline : true,
                                options: [{ title: 'Yes' }, { title: 'No' }],
                                fields : {
                                    str7: {
                                        tag   : 'str7',
                                        type  : 'string',
                                        title : 'Child 1.1',
                                        fields: {
                                            arr1: {
                                                tag    : 'arr1',
                                                type   : 'array',
                                                title  : 'Grandchild 1.1.1',
                                                options: [
                                                    { id: 0, title: 'Option 1' },
                                                    { id: 1, title: 'Option 2' }
                                                ],
                                                fields: {
                                                    bool2: {
                                                        tag    : 'bool2',
                                                        type   : 'boolean',
                                                        title  : 'Great-Grandchild 1.1.1.1',
                                                        options: [{ title: 'True' }, { title: 'False' }],
                                                        inline : true,
                                                        fields : {
                                                            str8: {
                                                                tag  : 'str8',
                                                                type : 'string',
                                                                title: 'Great-Great-Grandchild 1.1.1.1.1'
                                                            },
                                                            str9: {
                                                                tag  : 'str9',
                                                                type : 'string',
                                                                title: 'Great-Great-Grandchild 1.1.1.1.2'
                                                            }
                                                        }
                                                    },
                                                    num1: {
                                                        tag  : 'num1',
                                                        type : 'number',
                                                        title: 'Great-Grandchild 1.1.1.2',
                                                        min  : 10,
                                                        max  : 20
                                                    }
                                                }
                                            },
                                            num2: {
                                                tag  : 'num2',
                                                type : 'number',
                                                title: 'Grandchild 1.1.2'
                                            }
                                        }
                                    },
                                    str10: {
                                        tag   : 'str10',
                                        type  : 'string',
                                        title : 'Child 1.2',
                                        fields: {
                                            arr2: {
                                                tag    : 'arr2',
                                                type   : 'array',
                                                title  : 'Grandchild 1.2.1',
                                                options: [
                                                    { id: 0, title: 'Option 1' },
                                                    { id: 1, title: 'Option 2' },
                                                    { id: 2, title: 'Option 3' },
                                                    { id: 3, title: 'Option 4' }
                                                ]
                                            },
                                            num3: {
                                                tag  : 'num3',
                                                type : 'number',
                                                title: 'Grandchild 1.2.2'
                                            }
                                        }
                                    }
                                }
                            },
                            str11: {
                                tag   : 'str11',
                                type  : 'string',
                                title : 'Parent 2',
                                fields: {
                                    bool3: {
                                        tag   : 'bool3',
                                        type  : 'boolean',
                                        title : 'Child 2.1',
                                        fields: {
                                            str12: {
                                                tag  : 'str12',
                                                type : 'string',
                                                title: 'Grandchild 2.1.1'
                                            },
                                            str13: {
                                                tag  : 'str13',
                                                type : 'string',
                                                title: 'Grandchild 2.1.2'
                                            }
                                        }
                                    },
                                    bool4: {
                                        tag   : 'bool4',
                                        type  : 'boolean',
                                        title : 'Child 2.2',
                                        fields: {
                                            str14: {
                                                tag  : 'str14',
                                                type : 'string',
                                                title: 'Grandchild 2.2.1'
                                            },
                                            str15: {
                                                tag  : 'str15',
                                                type : 'string',
                                                title: 'Grandchild 2.2.2'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                title      : 'Conditions',
                subsections: [
                    {
                        title   : 'Simple',
                        subtitle: 'Conditionally show or hide fields based on model data',
                        fields  : {
                            bool5: {
                                tag    : 'bool5',
                                type   : 'boolean',
                                title  : 'Show child field?',
                                options: [{ title: 'Yes' }, { title: 'No' }],
                                fields : {
                                    str16: {
                                        tag          : 'str16',
                                        type         : 'string',
                                        title        : 'Conditional field',
                                        showCondition: {
                                            type       : 'EQUAL',
                                            expression1: {
                                                type : 'CONST',
                                                value: true
                                            },
                                            expression2: {
                                                type: 'FORM_RESPONSE',
                                                tag : 'bool5'
                                            }
                                        }
                                    }
                                }
                            },
                            str17: {
                                tag          : 'str17',
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
                                        tag : 'bool5'
                                    }
                                },
                                fields: {
                                    bool6: {
                                        tag          : 'bool6',
                                        type         : 'boolean',
                                        title        : 'Conditional field',
                                        options      : [{ title: 'True' }, { title: 'False' }],
                                        inline       : true,
                                        showCondition: {
                                            type      : 'BLANK',
                                            not       : true,
                                            expression: {
                                                type: 'FORM_RESPONSE',
                                                tag : 'str17'
                                            }
                                        }
                                    }
                                }
                            },
                            date1: {
                                tag   : 'date1',
                                type  : 'date',
                                title : 'Select a date',
                                fields: {
                                    str20: {
                                        tag          : 'str20',
                                        type         : 'string',
                                        title        : 'Conditional field',
                                        showCondition: {
                                            type      : 'BLANK',
                                            not       : true,
                                            expression: {
                                                type: 'FORM_RESPONSE',
                                                tag : 'date1'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        title : 'Arrays',
                        fields: {
                            arr3: {
                                tag    : 'arr3',
                                type   : 'array',
                                title  : 'Conditionally display fields under option fields',
                                options: [
                                    {
                                        id    : 0,
                                        title : 'Option 1',
                                        fields: {
                                            num4: {
                                                tag          : 'num4',
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
                                                        tag : 'arr3'
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    {
                                        id    : 1,
                                        title : 'Option 2',
                                        fields: {
                                            str18: {
                                                tag          : 'str18',
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
                                                        tag : 'arr3'
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    {
                                        id    : 2,
                                        title : 'Option 3',
                                        fields: {
                                            bool7: {
                                                tag          : 'bool7',
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
                                                        tag : 'arr3'
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    {
                                        id    : 3,
                                        title : 'Option 4',
                                        fields: {
                                            arr4: {
                                                tag    : 'arr4',
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
                                                        tag : 'arr3'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            arr5: {
                                tag    : 'arr5',
                                type   : 'array',
                                title  : 'Show a child regardless of the option(s) selected',
                                options: [
                                    { id: '0', title: 'Option 1' },
                                    { id: '1', title: 'Option 2' },
                                    { id: '2', title: 'Option 3' }
                                ],
                                fields: {
                                    num7: {
                                        tag          : 'num7',
                                        type         : 'number',
                                        title        : 'Conditional field',
                                        showCondition: {
                                            type      : 'EMPTY',
                                            not       : true,
                                            expression: {
                                                type: 'FORM_RESPONSE',
                                                tag : 'arr5'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        title   : 'Numeric',
                        subtitle: 'Number fields support simple expressions',
                        fields  : {
                            num5: {
                                tag   : 'num5',
                                type  : 'number',
                                title : 'Greater than (>)',
                                min   : 0,
                                max   : 10,
                                fields: {
                                    str19: {
                                        tag          : 'str19',
                                        type         : 'string',
                                        title        : 'Conditional field',
                                        showCondition: {
                                            type       : 'GREATER_THAN',
                                            expression1: {
                                                type: 'FORM_RESPONSE',
                                                tag : 'num5'
                                            },
                                            expression2: {
                                                type : 'CONST',
                                                value: 5
                                            }
                                        }
                                    }
                                }
                            },
                            num8: {
                                tag   : 'num8',
                                type  : 'number',
                                title : 'Less than (<)',
                                fields: {
                                    str21: {
                                        tag          : 'str21',
                                        type         : 'string',
                                        title        : 'Conditional field',
                                        showCondition: {
                                            type       : 'LESS_THAN',
                                            expression1: {
                                                type: 'FORM_RESPONSE',
                                                tag : 'num8'
                                            },
                                            expression2: {
                                                type : 'CONST',
                                                value: 5
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    uiSchema: {
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
        str13: {
            component: {
                type: 'textarea'
            }
        }
    },
    calcExpressionMap     : {},
    calcTriggerMap        : {},
    defaultValueTriggerMap: {}
};
