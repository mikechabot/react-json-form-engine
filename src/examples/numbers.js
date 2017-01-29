export default {
    id      : 'NUMBERS',
    title   : 'Numbers',
    sections: [
        {
            id         : 'Section-1',
            title      : 'Numbers',
            subsections: [
                {
                    id    : 'Subsection-1',
                    title : 'Stores [tag]:[value:Number]',
                    fields: [
                        {
                            id         : 'num1',
                            type       : 'number',
                            title      : 'Number field',
                            placeholder: 'Enter a value!'
                        },
                        {
                            id   : 'num2',
                            type : 'number',
                            title: 'Range slider',
                            min  : 0,
                            max  : 20
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        num2: {
            hint     : 'Range sliders are cool!',
            component: {
                type: 'range'
            }
        }
    }
};
