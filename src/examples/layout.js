export default {
    id    : 'LAYOUT',
    title : 'Layout',
    schema: {
        sections: [
            {
                title      : 'Section 1',
                subsections: [
                    {
                        title : 'Subsection 1.1',
                        fields: {
                            str1: {
                                tag  : 'str1',
                                type : 'string',
                                title: 'Text field'
                            }
                        }
                    },
                    {
                        title : 'Subsection 1.2',
                        fields: {
                            str2: {
                                tag  : 'str2',
                                type : 'string',
                                title: 'Textarea field'
                            }
                        }
                    }
                ]
            },
            {
                title      : 'Section 2',
                subsections: [
                    {
                        title : 'Subsection 2.1',
                        fields: {
                            str3: {
                                tag  : 'str3',
                                type : 'string',
                                title: 'Text field'
                            }
                        }
                    }
                ]
            },
            {
                title      : 'Section 3',
                subsections: [
                    {
                        title : 'Subsection 3.1',
                        fields: {
                            str4: {
                                tag  : 'str4',
                                type : 'string',
                                title: 'Text field'
                            }
                        }
                    },
                    {
                        title : 'Subsection 3.2',
                        fields: {
                            num1: {
                                tag  : 'num1',
                                type : 'number',
                                title: 'Number field'
                            }
                        }
                    },
                    {
                        title : 'Subsection 3.3',
                        fields: {
                            bool1: {
                                tag  : 'bool1',
                                type : 'boolean',
                                title: 'Checkbox field'
                            }
                        }
                    },
                    {
                        title : 'Subsection 3.4',
                        fields: {
                            num2: {
                                tag  : 'num2',
                                type : 'number',
                                title: 'Range slider',
                                min  : 0,
                                max  : 10
                            }
                        }
                    }
                ]
            }
        ]
    },
    uiSchema: {
        str2: {
            component: {
                type: 'textarea'
            }
        },
        num2: {
            component: {
                type: 'range'
            }
        }
    },
    calcExpressionMap     : {},
    calcTriggerMap        : {},
    defaultValueTriggerMap: {}
};
