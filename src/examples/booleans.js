export default {
    id      : 'BOOLEANS',
    title   : 'Booleans',
    sections: [
        {
            id         : 'Section-1',
            title      : 'Booleans',
            subsections: [
                {
                    id    : 'Subsection-1',
                    title : 'Stores [tag]:[value:Boolean]',
                    fields: [
                        {
                            id   : 'bool1',
                            type : 'boolean',
                            title: 'Single checkbox'
                        },
                        {
                            id     : 'bool2',
                            type   : 'boolean',
                            title  : 'Radio field',
                            inline : true,
                            options: [
                                { title: 'Yes' }, { title: 'No' }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        bool2: {
            hint: 'Labels are configurable ("Yes" / "No"), but the stored value is always boolean!'
        }
    }
};
