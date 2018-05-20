export default {
    id: 'LAYOUT',
    title: 'Layout',
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
                    id: 'Subsection-1.1',
                    title: 'Subsection 1.1',
                    subtitle: 'Utilize sections and subsections for greater organization',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'Text field'
                        }
                    ]
                },
                {
                    id: 'Subsection-1.2',
                    title: 'Subsection 1.2',
                    fields: [
                        {
                            id: 'str2',
                            type: 'string',
                            title: 'Textarea field'
                        }
                    ]
                }
            ]
        },
        {
            id: 'Section-2',
            title: 'Section 2',
            subsections: [
                {
                    id: 'Subsection-2.1',
                    title: 'Subsection 2.1',
                    subtitle: 'Just a single subsection',
                    fields: [
                        {
                            id: 'str3',
                            type: 'string',
                            title: 'Text field'
                        }
                    ]
                }
            ]
        },
        {
            id: 'Section-3',
            title: 'Section 3',
            subsections: [
                {
                    id: 'Subsection-3.1',
                    title: 'Subsection 3.1',
                    subtitle: 'This is a subtitle',
                    fields: [
                        {
                            id: 'str4',
                            type: 'string',
                            title: 'Text field'
                        }
                    ]
                },
                {
                    id: 'Subsection-3.2',
                    title: 'Subsection 3.2',
                    fields: [
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field'
                        }
                    ]
                },
                {
                    id: 'Subsection-3.3',
                    title: 'Subsection 3.3',
                    fields: [
                        {
                            id: 'bool1',
                            type: 'boolean',
                            title: 'Checkbox field'
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        str2: {
            hint: 'This subsection doesn\'t have a subtitle',
            component: {
                type: 'textarea'
            }
        }
    }
};
