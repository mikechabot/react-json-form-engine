export default {
    id: 'ARRAYS',
    title: 'Arrays',
    faIcon: {
        name: 'th-large'
    },
    sections: [
        {
            id: 'section_0',
            title: 'Arrays',
            subsections: [
                {
                    id: 'subsection_0',
                    title: 'Store Array Values',
                    subtitle: 'Persists as "[id]:[value:Array]" in the Model',
                    fields: [
                        {
                            id: 'array1',
                            type: 'array',
                            title: 'Multiselect',
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' },
                                { id: 'op4', title: 'Option 4' }
                            ]
                        },
                        {
                            id: 'array2',
                            type: 'array',
                            title: 'Checkbox group',
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
        array1: {
            hint: 'Select a whole bunch.'
        },
        array2: {
            component: {
                type: 'checkboxgroup'
            }
        }
    }
};
