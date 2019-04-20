export default {
    id: 'rehydratedForm',
    title: 'Rehydrated Form',
    sections: [
        {
            id: 'rehydratedSection',
            title: 'Rehydration',
            subsections: [
                {
                    id: 'rehydratedSubsection',
                    title: 'Rehydration Example',
                    subtitle: 'Example of rehydrating a form from JSON',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'String field'
                        },
                        {
                            id: 'bool1',
                            type: 'boolean',
                            title: 'Bool field'
                        },
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field'
                        },
                        {
                            id: 'arr1',
                            type: 'array',
                            title: 'Array field',
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' }
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
        }
    }
};
