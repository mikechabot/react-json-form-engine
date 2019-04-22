export default {
    id: 'infoFotm',
    title: 'Info',
    faIcon: {
        name: 'question-circle'
    },
    sections: [
        {
            id: 'infoSection',
            title: 'Info',
            subsections: [
                {
                    id: 'infoSubsection',
                    title: 'Show Info',
                    subtitle: 'Use an info field to render information with rich text.',
                    fields: [
                        {
                            id: 'info1',
                            type: 'info',
                            content: `Display helpful information so the user knows how to fill out the form. 
                                The Info field utilizes <code>dangerouslySetInnerHTML</code>, which means we render
                                content directly into the DOM, so <em>please be aware of <strong>XSS</strong> concerns</em> <script>alert('hello')</script>!`
                        },
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'String Field'
                        },
                        {
                            id: 'info2',
                            type: 'info',
                            title: 'We can have titles too!',
                            content:
                                'Although titles in Info fields are optional, they are available for use.'
                        },
                        {
                            id: 'num1s',
                            type: 'number',
                            title: 'Number Field'
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        array1: {
            hint: 'Select a whole bunch.'
        },
        array2: {
            component: {
                type: 'checkboxgroup'
            }
        }
    }
};
