export default {
    id: 'dateTimeForm',
    title: 'Date/Time',
    faIcon: {
        name: 'calendar-alt'
    },
    sections: [
        {
            id: 'dateTimeSection',
            title: 'Date/Time',
            subsections: [
                {
                    id: 'dateTimeSubsection',
                    title: 'Store Date/Time Values',
                    subtitle: 'Persists as [id]:[value:Date] in the Model',
                    fields: [
                        {
                            id: 'date1',
                            type: 'date',
                            title: 'Date/Time field'
                        },
                        {
                            id: 'date2',
                            type: 'date',
                            title: 'Time field'
                        },
                        {
                            id: 'date3',
                            type: 'date',
                            title: 'Date field'
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        date2: {
            hideCalendar: true
        },
        date3: {
            hideTime: true
        }
    }
};
