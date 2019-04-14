import Maybe from 'maybe-baby';
import apiCheck from 'api-check';

import { COMPONENT_TYPE, DATA_TYPE, PROPERTY } from '../config/form-const';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
const { FIELD, SECTION, SUBSECTION, DEFINITION } = PROPERTY;

// Configure api-check
const validator = apiCheck({ output: { prefix: 'FormEngine:' } });

const FormApiService = {
    validateFieldShape(field) {
        validator.throw(
            [
                validator.shape({
                    [FIELD.ID]: validator.oneOfType([validator.string, validator.number]),
                    [FIELD.TYPE]: validator.string,
                    [FIELD.TITLE]: validator.string,
                    [FIELD.SUBTITLE]: validator.string.optional,
                    [FIELD.OPTIONS]: validator.array.optional,
                    [FIELD.FIELDS]: validator.array.optional,
                    [FIELD.MIN]: validator.number.optional,
                    [FIELD.MAX]: validator.number.optional,
                    [FIELD.REQUIRED]: validator.bool.optional,
                    [FIELD.PLACEHOLDER]: validator.string.optional,
                    [FIELD.PATTERN]: validator.string.optional,
                    [FIELD.SHOW_CONDITION]: validator.object.optional
                })
            ],
            arguments,
            {
                prefix: `[Field: ${_getObjectIdDisplay(field)}]`
            }
        );
    },
    validateDefinitionShape(definition) {
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
                    [DEFINITION.DECORATORS]: validator.object.optional
                }).strict
            ],
            arguments,
            {
                prefix: `[Definition: "${_getObjectIdDisplay(definition)}"]`
            }
        );
    },
    validateFieldTypesShape(field) {
        if (
            field[FIELD.TYPE] === DATA_TYPE.STRING &&
            field[FIELD.COMPONENT].type === COMPONENT_TYPE.RADIO &&
            !field[FIELD.OPTIONS].every(o => !isNil(o[FIELD.ID]))
        ) {
            throw new Error(
                `Field combination of data type "${DATA_TYPE.STRING}" and component type "${
                    COMPONENT_TYPE.RADIO
                }" contains an option missing required "id" (id: ${field.id})`
            );
        }

        if (field[FIELD.TYPE] === DATA_TYPE.NUMBER) {
            const hasMax = !isNil(field[FIELD.MAX]);
            const hasMin = !isNil(field[FIELD.MIN]);

            if (field[FIELD.COMPONENT].type === COMPONENT_TYPE.RANGE) {
                if (!hasMin || !hasMax) {
                    throw new Error(
                        `Field of component type "${
                            COMPONENT_TYPE.RANGE
                        }" is missing required min/max values (id: ${field.id}) `
                    );
                }
            }

            if (hasMin && hasMax) {
                if (field[FIELD.MIN] === field[FIELD.MAX]) {
                    throw new Error(
                        `Field of data type "${DATA_TYPE.NUMBER}" cannot have an equal min/max value (id: ${
                            field.id
                        }) `
                    );
                } else if (field[FIELD.MIN] > field[FIELD.MAX]) {
                    throw new Error(
                        `Field of data type "${
                            DATA_TYPE.NUMBER
                        }" cannot have a min value less than the max (id: ${field.id}) `
                    );
                }
            }
        }

        if (field[FIELD.TYPE] === DATA_TYPE.ARRAY) {
            if (isEmpty(field[FIELD.OPTIONS])) {
                throw new Error(
                    `Field of data type "${DATA_TYPE.ARRAY}" is missing required "options" array (id: ${
                        field.id
                    })`
                );
            }
            if (!field[FIELD.OPTIONS].every(o => !isNil(o[FIELD.ID]))) {
                throw new Error(
                    `Field of data type "${DATA_TYPE.ARRAY}" contains an option missing required "id" (id: ${
                        field.id
                    })`
                );
            }
        }

        return { isValid: true };
    }
};

const _getObjectIdDisplay = field => {
    return Maybe.of(field)
        .prop(FIELD.ID)
        .orElse('[No Id]')
        .join();
};

export default FormApiService;
