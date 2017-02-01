export default {
    id      : 'ARRAYS',
    title   : 'Arrays',
    sections: [
        {
            id         : 'Section-1',
            title      : 'Arrays',
            subsections: [
                {
                    id      : 'Subsection-1',
                    title   : 'Stores [id]:[value:Array]',
                    subtitle: 'Store the ids of the selected options',
                    fields  : [
                        {
                            id     : 'array1',
                            type   : 'array',
                            title  : 'Multiselect',
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' },
                                { id: 'op4', title: 'Option 4' }
                            ]
                        },
                        {
                            id     : 'array2',
                            type   : 'array',
                            title  : 'Checkbox group',
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' },
                                { id: 'op4', title: 'Option 4' }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        array2: {
            component: {
                type: 'checkboxgroup'
            }
        }
    }
};
