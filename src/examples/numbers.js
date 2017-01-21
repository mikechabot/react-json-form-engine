export default {
    id    : 'NUMBERS',
    title : 'Numbers',
    schema: {
        sections: [
            {
                title      : 'Numbers',
                subsections: [
                    {
                        title : 'Stores [tag]:[value:Number]',
                        fields: {
                            num1: {
                                tag        : 'num1',
                                type       : 'number',
                                title      : 'Number field',
                                placeholder: 'Enter a value!'
                            },
                            num2: {
                                tag  : 'num2',
                                type : 'number',
                                title: 'Range slider',
                                min  : 0,
                                max  : 20
                            }
                        }
                    }
                ]
            }
        ]
    },
    uiSchema: {
        num2: {
            hint     : 'Range sliders are cool!',
            component: {
                type: 'range'
            }
        }
    },
    calcExpressionMap     : {},
    calcTriggerMap        : {},
    defaultValueTriggerMap: {}
};
