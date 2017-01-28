module.exports = {
    getMinimallyViableDefinition: function () {
        return {
            id      : 'my-form',
            title   : 'Form Title',
            sections: [{
                id         : 'section-1',
                title      : 'Section Title',
                sortOrder  : 0,
                subsections: [{
                    id       : 'subsection-1',
                    title    : 'Subsection Title',
                    sortOrder: 1,
                    fields   : []
                }]
            }]
        };
    },
    getFormDefinitionWithFields: function () {
        return {
            id      : 'my-form',
            title   : 'Form Title',
            sections: [{
                id         : 'section-1',
                title      : 'Section Title',
                sortOrder  : 0,
                subsections: [{
                    id       : 'subsection-1',
                    title    : 'Subsection Title',
                    sortOrder: 1,
                    fields   : [{
                        id       : 'field-1',
                        title    : 'String field',
                        type     : 'string',
                        sortOrder: 0
                    }]
                }]
            }]
        };
    }
};
