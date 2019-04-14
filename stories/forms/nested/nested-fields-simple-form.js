export default {
    id: 'nestedFieldsSimpleForm',
    title: 'Simple Nesting',
    faIcon: {
        name: 'indent'
    },
    sections: [
        {
            id: 'simpleSection',
            title: 'Simple',
            subsections: [
                {
                    id: 'simpleSubsection',
                    title: 'Simple Nesting',
                    subtitle: 'Simple parent/child relationships',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'Parent 1',
                            fields: [
                                {
                                    id: 'str2',
                                    type: 'string',
                                    title: 'Child 1'
                                },
                                {
                                    id: 'str3',
                                    type: 'string',
                                    title: 'Child 2'
                                }
                            ]
                        },
                        {
                            id: 'str4',
                            type: 'string',
                            title: 'Parent 2',
                            fields: [
                                {
                                    id: 'str5',
                                    type: 'string',
                                    title: 'Child 1'
                                },
                                {
                                    id: 'str6',
                                    type: 'string',
                                    title: 'Child 2'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
