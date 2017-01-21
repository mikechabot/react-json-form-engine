export default {
    id    : 'DATETIME',
    title : 'Date/Time',
    schema: {
        sections: [
            {
                title      : 'Date/Time',
                subsections: [
                    {
                        title : 'Stores [tag]:[value:Date]',
                        fields: {
                            date1: {
                                tag  : 'date1',
                                type : 'date',
                                title: 'Date/Time field'
                            },
                            date2: {
                                tag         : 'date2',
                                type        : 'date',
                                title       : 'Time field',
                                hideCalendar: true
                            },
                            date3: {
                                tag     : 'date3',
                                type    : 'date',
                                title   : 'Date field',
                                hideTime: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    uiSchema              : {},
    calcExpressionMap     : {},
    calcTriggerMap        : {},
    defaultValueTriggerMap: {}
};
