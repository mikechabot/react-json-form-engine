export default {
    id: 'regexValidations',
    title: 'Regex Validation',
    faIcon: {
        name: 'asterisk'
    },
    sections: [
        {
            id: 'sectionRegex',
            title: 'Regex',
            subsections: [
                {
                    id: 'subsectionRegex',
                    title: 'Add a Regex to any String or Number field',
                    subtitle: 'Useful for validating emails, URLS, etc.',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'String Regex',
                            pattern: '^foobar!$',
                            required: true
                        },
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number Regex',
                            pattern: '^3',
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        str1: {
            hint: 'This field is also required, try entering some text, and then removing it.'
        },
        num1: {
            hint: 'This field is also required, try entering some text, and then removing it.'
        }
    }
};
