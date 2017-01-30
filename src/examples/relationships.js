export default {
    id      : 'RELATIONSHIPS',
    title   : 'Relationships',
    sections: [
        {
            id         : 'Simple-Section',
            title      : 'Simple',
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
                }
            ]
        },
        {
            id         : 'Complex-Section',
            title      : 'Complex',
            subsections: [
                {
                    id      : 'Complex-Subsection',
                    title   : 'Complex',
                    subtitle: 'Use any combination of fields to create deep relationships',
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
                                                { id: 'op1', title: 'Option 1' },
                                                { id: 'op2', title: 'Option 2' }
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
                                                { id: 'op1', title: 'Option 1' },
                                                { id: 'op2', title: 'Option 2' },
                                                { id: 'op3', title: 'Option 3' },
                                                { id: 'op4', title: 'Option 4' }
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
        num1: {
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
