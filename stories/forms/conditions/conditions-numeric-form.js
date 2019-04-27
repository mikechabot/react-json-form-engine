export default {
    id: 'conditionsForm',
    title: 'Numeric Conditions',
    faIcon: {
        name: 'code'
    },
    sections: [
        {
            id: 'conditionsSection',
            title: 'Numeric',
            subsections: [
                {
                    id: 'conditionsSubsection',
                    title: 'Numeric',
                    subtitle: 'Simple numeric expressions supported!',
                    fields: [
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Greater-Than (>)',
                            min: 0,
                            max: 10,
                            fields: [
                                {
                                    id: 'str1',
                                    type: 'string',
                                    title: 'Field',
                                    showCondition: {
                                        type: 'GREATER_THAN',
                                        expressions: [
                                            {
                                                type: 'FORM_RESPONSE',
                                                id: 'num1'
                                            },
                                            {
                                                type: 'CONST',
                                                value: 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            id: 'num2',
                            type: 'number',
                            title: 'Less-Than (<)',
                            fields: [
                                {
                                    id: 'str2',
                                    type: 'string',
                                    title: 'Field',
                                    showCondition: {
                                        type: 'LESS_THAN',
                                        expressions: [
                                            {
                                                type: 'FORM_RESPONSE',
                                                id: 'num2'
                                            },
                                            {
                                                type: 'CONST',
                                                value: 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            id: 'num3',
                            type: 'number',
                            title: 'Between 25 and 75',
                            min: 0,
                            max: 100,
                            fields: [
                                {
                                    id: 'str2',
                                    type: 'string',
                                    title: 'Field',
                                    showCondition: {
                                        type: 'BETWEEN',
                                        expressions: [
                                            {
                                                type: 'FORM_RESPONSE',
                                                id: 'num3'
                                            },
                                            {
                                                type: 'CONST',
                                                value: [25, 75]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        num1: {
            hint: 'Select a number greater than 5 to show the child',
            component: {
                type: 'range'
            }
        },
        num2: {
            hint: 'Enter a number less than 5 to show the child'
        },
        num3: {
            hint: 'Select a number between 25-75 to show the child',
            component: {
                type: 'range'
            }
        }
    }
};
