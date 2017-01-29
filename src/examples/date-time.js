export default {
    id      : 'DATETIME',
    title   : 'Date/Time',
    sections: [
        {
            id         : 'Section-1',
            title      : 'Date/Time',
            subsections: [
                {
                    id    : 'Subsection-1',
                    title : 'Stores [tag]:[value:Date]',
                    fields: [
                        {
                            id   : 'date1',
                            type : 'date',
                            title: 'Date/Time field'
                        },
                        {
                            id   : 'date2',
                            type : 'date',
                            title: 'Time field'
                        },
                        {
                            id   : 'date3',
                            type : 'date',
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
