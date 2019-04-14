export default {
    id: 'numbersForm',
    title: 'Numbers Form',
    faIcon: {
        name: 'hashtag'
    },
    sections: [
        {
            id: 'numbersSection',
            title: 'Numbers',
            subsections: [
                {
                    id: 'numbersSubsection',
                    title: 'Store Numeric Values',
                    subtitle: 'Persists as "[id]:[value:Number]" in the Model',
                    fields: [
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field',
                            placeholder: 'Enter a value',
                            required: true
                        },
                        {
                            id: 'num2',
                            type: 'number',
                            title: 'Range slider',
                            min: 0,
                            max: 100,
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        num1: {
            hint: 'Numbers only!'
        },
        num2: {
            hint: 'Range sliders are cool!',
            component: {
                type: 'range'
            }
        }
    }
};
