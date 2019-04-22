import Maybe from 'maybe-baby';
import apiCheck from 'api-check';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { COMPONENT_TYPE, DATA_TYPE, PROPERTY } from '../config/form-const';

const { FIELD, SECTION, SUBSECTION, DEFINITION } = PROPERTY;
const { STRING, NUMBER, ARRAY } = DATA_TYPE;
const { RANGE, RADIO } = COMPONENT_TYPE;

// Configure api-check
const validator = apiCheck({ output: { prefix: 'FormEngine:' } });

const INVALID_TYPES_MESSAGE = {
    [RADIO]: `Field combination of data type "${STRING}" and component type "${RADIO}" requires all options have an "id"`,
    [RANGE]: `Field of component type "${RANGE}" is missing required min/max values`,
    NUMBER_EQUALS: `Field of data type "${NUMBER}" cannot have an equal min/max value`,
    NUMBER_DIFF: `Field of data type "${NUMBER}" cannot have a min value less than the max`,
    ARRAY_OPTIONS: `Field of data type "${ARRAY}" is missing required "options" array`,
    ARRAY_OPTION_ID: `Field of data type "${ARRAY}" contains an option missing required "id"`
};

const FormApiService = {
    validateFieldShape(field) {
        validator.throw(
            [
                validator.shape({
                    [FIELD.ID]: validator.oneOfType([validator.string, validator.number]),
                    [FIELD.TYPE]: validator.string,
                    [FIELD.TITLE]:
                        field.type === DATA_TYPE.INFO ? validator.string.optional : validator.string,
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
        const idSuffix = `(id: ${field.id})`;

        if (
            field[FIELD.TYPE] === DATA_TYPE.STRING &&
            field[FIELD.COMPONENT].type === RADIO &&
            !field[FIELD.OPTIONS].every(o => !isNil(o[FIELD.ID]))
        ) {
            throw new Error(`${INVALID_TYPES_MESSAGE[RADIO]} ${idSuffix}`);
        }

        if (field[FIELD.TYPE] === DATA_TYPE.NUMBER) {
            const hasMax = !isNil(field[FIELD.MAX]);
            const hasMin = !isNil(field[FIELD.MIN]);

            if (field[FIELD.COMPONENT].type === RANGE && (!hasMin || !hasMax)) {
                throw new Error(`${INVALID_TYPES_MESSAGE[RANGE]} ${idSuffix}`);
            }

            if (hasMin && hasMax) {
                if (field[FIELD.MIN] === field[FIELD.MAX]) {
                    throw new Error(`${INVALID_TYPES_MESSAGE.NUMBER_EQUALS} ${idSuffix}`);
                } else if (field[FIELD.MIN] > field[FIELD.MAX]) {
                    throw new Error(`${INVALID_TYPES_MESSAGE.NUMBER_DIFF} ${idSuffix}`);
                }
            }
        }

        if (field[FIELD.TYPE] === ARRAY) {
            if (isEmpty(field[FIELD.OPTIONS])) {
                throw new Error(`${INVALID_TYPES_MESSAGE.ARRAY_OPTIONS} ${idSuffix}`);
            }
            if (!field[FIELD.OPTIONS].every(o => !isNil(o[FIELD.ID]))) {
                throw new Error(`${INVALID_TYPES_MESSAGE.ARRAY_OPTION_ID} ${idSuffix}`);
            }
        }
    }
};

const _getObjectIdDisplay = field => {
    return Maybe.of(field)
        .prop(FIELD.ID)
        .orElse('[No Id]')
        .join();
};

export default FormApiService;
