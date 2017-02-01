export default {
    id      : 'BOOLEANS',
    title   : 'Booleans',
    sections: [
        {
            id         : 'Section-1',
            title      : 'Booleans',
            subsections: [
                {
                    id      : 'Subsection-1',
                    title   : 'Stores [id]:[value:Boolean]',
                    subtitle: 'Single checkbox, or double radio',
                    fields  : [
                        {
                            id   : 'bool1',
                            type : 'boolean',
                            title: 'Single checkbox'
                        },
                        {
                            id     : 'bool2',
                            type   : 'boolean',
                            title  : 'Radio field',
                            inline : false,
                            options: [
                                { title: 'Yes' }, { title: 'No' }
                            ]
                        },
                        {
                            id     : 'bool3',
                            type   : 'boolean',
                            title  : 'Radio field (inline)',
                            inline : true,
                            options: [
                                { title: 'Maybe' }, { title: 'Perhaps' }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        bool2: {
            hint: 'Option titles are configurable, but the stored value is always boolean'
        }
    }
};
