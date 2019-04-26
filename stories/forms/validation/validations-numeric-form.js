export default {
    id: 'numericValidations',
    title: 'Numeric Validation',
    faIcon: {
        name: 'asterisk'
    },
    sections: [
        {
            id: 'sectionNumeric',
            title: 'Numeric',
            subsections: [
                {
                    id: 'subsectionNumeric',
                    title: 'Min/max validation supported',
                    subtitle: 'Display an error if out-of-range',
                    fields: [
                        {
                            id: 'info',
                            type: 'info',
                            content: 'Numeric validations are only enforced once a field is marked as dirty.'
                        },
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field',
                            min: 0,
                            max: 25
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        num1: {
            hint: 'Min: 0, Max: 25. Try entering a value outside the range.'
        }
    }
};
