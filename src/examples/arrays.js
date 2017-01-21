export default {
    id    : 'ARRAYS',
    title : 'Arrays',
    schema: {
        sections: [
            {
                title      : 'Arrays',
                subsections: [
                    {
                        title   : 'Stores [tag]:[value:Array]',
                        subtitle: 'Store the ids of the selected options',
                        fields  : {
                            array1: {
                                tag    : 'array1',
                                type   : 'array',
                                title  : 'Multiselect',
                                options: [
                                    { id: 0, title: 'Option 1' },
                                    { id: 1, title: 'Option 2' },
                                    { id: 2, title: 'Option 3' },
                                    { id: 3, title: 'Option 4' }
                                ]
                            },
                            array2: {
                                tag    : 'array2',
                                type   : 'array',
                                title  : 'Checkbox group',
                                options: [
                                    { id: 0, title: 'Option 1' },
                                    { id: 1, title: 'Option 2' },
                                    { id: 2, title: 'Option 3' },
                                    { id: 3, title: 'Option 4' }
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    uiSchema: {
        array2: {
            component: {
                type: 'checkboxgroup'
            }
        }
    },
    calcExpressionMap     : {},
    calcTriggerMap        : {},
    defaultValueTriggerMap: {}
};
