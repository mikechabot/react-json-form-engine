export default {
    id: 'multiSectionForm',
    title: 'Multi-Section',
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
                    title: 'Subsection of Section 1',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'Text field'
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
                    title: 'Subsection of Section 2',
                    subtitle: 'Yet another subtitle',
                    fields: [
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field'
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
                    title: 'Subsection of Section 3',
                    subtitle: 'This is a subtitle',
                    fields: [
                        {
                            id: 'str4',
                            type: 'string',
                            title: 'Text field'
                        }
                    ]
                }
            ]
        }
    ]
};
