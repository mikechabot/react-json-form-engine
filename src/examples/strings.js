export default {
    id    : 'STRINGS',
    title : 'Strings',
    schema: {
        sections: [
            {
                title      : 'Strings',
                subsections: [
                    {
                        title : 'Stores [tag]:[value:String]',
                        fields: {
                            str1: {
                                tag        : 'str1',
                                type       : 'string',
                                title      : 'Text field',
                                placeholder: 'Placeholder!'
                            },
                            str2: {
                                tag        : 'str2',
                                type       : 'string',
                                title      : 'Textarea field',
                                placeholder: 'Placeholder!'
                            },
                            str3: {
                                tag        : 'str3',
                                type       : 'string',
                                title      : 'Select field',
                                placeholder: '-- select an option --',
                                options    : [
                                    {id: 0, title: 'Option 1'},
                                    {id: 1, title: 'Option 2'},
                                    {id: 2, title: 'Option 3'}
                                ]
                            },
                            str4: {
                                tag    : 'str4',
                                type   : 'string',
                                title  : 'Radio field',
                                options: [
                                    { title: 'Male', id: 'M' },
                                    { title: 'Female', id: 'F' },
                                    { title: 'Decline', id: 'N/A' }
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    uiSchema: {
        str2: {
            hint     : 'This is some hint text',
            component: {
                type: 'textarea'
            }
        },
        str3: {
            hint: 'Stores the id of the selected option'
        },
        str4: {
            hint     : 'Stores the id of the selected option',
            component: {
                type: 'radio'
            }
        }
    },
    calcExpressionMap     : {},
    calcTriggerMap        : {},
    defaultValueTriggerMap: {}
};
