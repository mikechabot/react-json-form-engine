export default {
    id: 'requiredValidations',
    title: 'Required Validation',
    faIcon: {
        name: 'asterisk'
    },
    sections: [
        {
            id: 'sectionRequired',
            title: 'Required',
            subsections: [
                {
                    id: 'subsectionRequired',
                    title: 'Make any field required',
                    subtitle: 'Only display errors once a field is marked as dirty, or the form is submitted',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'Text field',
                            required: true,
                            fields: [
                                {
                                    id: 'str2',
                                    type: 'string',
                                    title: 'Required Child',
                                    required: true
                                }
                            ]
                        },
                        {
                            id: 'array1',
                            type: 'array',
                            title: 'Multiselect',
                            required: true,
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' },
                                { id: 'op4', title: 'Option 4' }
                            ]
                        },
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field',
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        str1: {
            hint: 'Enter some text, then delete it.'
        },
        array1: {
            hint: 'Select, then deselect an option.',
            component: {
                type: 'checkboxgroup'
            }
        },
        num1: {
            hint: 'Try entering some text'
        }
    }
};
