export default {
    id    : 'BOOLEANS',
    title : 'Booleans',
    schema: {
        sections: [
            {
                title      : 'Booleans',
                subsections: [
                    {
                        title : 'Stores [tag]:[value:Boolean]',
                        fields: {
                            bool1: {
                                tag  : 'bool1',
                                type : 'boolean',
                                title: 'Single checkbox'
                            },
                            bool2: {
                                tag    : 'bool2',
                                type   : 'boolean',
                                title  : 'Radio field',
                                inline : true,
                                options: [
                                    { title: 'Yes' }, { title: 'No' }
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    uiSchema: {
        bool2: {
            hint: 'Labels are configurable ("Yes" / "No"), but the stored value is always boolean!'
        }
    },
    calcExpressionMap     : {},
    calcTriggerMap        : {},
    defaultValueTriggerMap: {}

};
