export default {
    id: 'STRINGS',
    title: 'Strings',
    faIcon: {
        name: 'i-cursor'
    },
    sections: [
        {
            id: 'section_0',
            title: 'Strings',
            sortOrder: 0,
            subsections: [
                {
                    id: 'subsection_0',
                    title: 'Store String Values',
                    subtitle: 'Persists as "[id]:[value:String]" in the Model',
                    sortOrder: 0,
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'Text',
                            placeholder: 'This is a placeholder',
                            sortOrder: 0
                        },
                        {
                            id: 'str2',
                            type: 'string',
                            title: 'Password',
                            sortOrder: 4
                        },
                        {
                            id: 'str3',
                            type: 'string',
                            title: 'Textarea',
                            placeholder: 'Yet another placeholder',
                            sortOrder: 1
                        },
                        {
                            id: 'str4',
                            type: 'string',
                            title: 'Select',
                            placeholder: '-- Select Something --',
                            options: [
                                { id: 'pepsi', title: 'Pepsi' },
                                { id: 'coke', title: 'Coca-Cola' },
                                { id: 'orange', title: 'Orange Crush' }
                            ],
                            sortOrder: 2
                        },
                        {
                            id: 'str5',
                            type: 'string',
                            title: 'Radio',
                            options: [
                                { title: 'Pizza', id: 'pizza-is-good' },
                                { title: 'Cotton Candy', id: 'cotton-candy-is-sweet' },
                                { title: 'Pretzel', id: 'pretzels-are-salty' }
                            ],
                            sortOrder: 3
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        str2: {
            component: {
                type: 'password'
            }
        },
        str3: {
            hint: 'This is some hint text.',
            component: {
                type: 'textarea'
            }
        },
        str4: {
            hint: 'Stores the option id as the value.'
        },
        str5: {
            hint: 'Stores the option id as the value.',
            component: {
                type: 'radio'
            }
        }
    }
};
