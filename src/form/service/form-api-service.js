import Maybe from 'maybe-baby';
import apiCheck from 'api-check';

import { PROPERTY } from '../config/form-const';
const { FIELD, SECTION, SUBSECTION, DEFINITION, CALCULATIONS } = PROPERTY;

// Configure api-check
const validator = apiCheck({ output: { prefix: 'FormEngine:' } });

const FormApiService = {
    __validateFieldShape(field) {
        validator.throw(
            [
                validator.shape({
                    [FIELD.ID]: validator.oneOfType([validator.string, validator.number]),
                    [FIELD.TYPE]: validator.string,
                    [FIELD.TITLE]: validator.string,
                    [FIELD.SUBTITLE]: validator.string.optional
                })
            ],
            arguments,
            {
                prefix: `[Field: ${_getObjectIdDisplay(field)}]`
            }
        );
    },
    __validateDefinitionShape(definition) {
        validator.throw(
            [
                validator.shape({
                    [DEFINITION.ID]: validator.string,
                    [DEFINITION.TITLE]: validator.string,
                    [DEFINITION.FA_ICON]: validator.object.optional,
                    [DEFINITION.SUBTITLE]: validator.string.optional,
                    [DEFINITION.SECTIONS]: validator.arrayOf(
                        validator.shape({
                            [SECTION.ID]: validator.string,
                            [SECTION.TITLE]: validator.string,
                            [SECTION.SUBTITLE]: validator.string.optional,
                            [SECTION.SORT_ORDER]: validator.number.optional,
                            [SECTION.SUBSECTIONS]: validator.arrayOf(
                                validator.shape({
                                    [SUBSECTION.ID]: validator.string,
                                    [SUBSECTION.TITLE]: validator.string,
                                    [SUBSECTION.SUBTITLE]: validator.string.optional,
                                    [SUBSECTION.SORT_ORDER]: validator.number.optional,
                                    [SUBSECTION.FIELDS]: validator.arrayOf(validator.object)
                                }).strict
                            )
                        }).strict
                    ),
                    [DEFINITION.DECORATORS]: validator.object.optional,
                    [DEFINITION.CALCULATIONS]: validator.shape({
                        [CALCULATIONS.EXPRESSION_MAP]: validator.object.optional,
                        [CALCULATIONS.TRIGGER_MAP]: validator.object.optional
                    }).optional,
                    [DEFINITION.DEFAULT_VALUE_TRIGGERS]: validator.object.optional
                }).strict
            ],
            arguments,
            {
                prefix: `[Definition: "${_getObjectIdDisplay(definition)}"]`
            }
        );
    }
};

const _getObjectIdDisplay = field => {
    return Maybe.of(field)
        .prop(FIELD.ID)
        .orElse('[No Id]')
        .join();
};

export default FormApiService;
