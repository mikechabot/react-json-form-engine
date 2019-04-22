export default {
    id: 'multiSubsectionForm',
    title: 'Multi-Subsection Form',
    faIcon: {
        name: 'object-group',
        prefix: 'far'
    },
    sections: [
        {
            id: 'Section-1',
            title: 'Section 1',
            subsections: [
                {
                    id: 'Subsection-1',
                    title: 'Subsection 1',
                    subtitle: 'This is a subtitle',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'Text field'
                        }
                    ]
                },
                {
                    id: 'Subsection-2',
                    title: 'Subsection 2',
                    fields: [
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field',
                            min: 0,
                            max: 50
                        }
                    ]
                },
                {
                    id: 'Subsection-3',
                    title: 'Subsection 3',
                    fields: [
                        {
                            id: 'bool1',
                            type: 'boolean',
                            title: 'Checkbox field'
                        },
                        {
                            id: 'bool2',
                            type: 'string',
                            title: 'String Field'
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        num1: {
            hint: 'This subsection has no subtitle!',
            component: {
                type: 'range'
            }
        }
    }
};
