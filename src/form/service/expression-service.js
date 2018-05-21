import { __hasValue, __blank } from '../../common';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';
import _filter from 'lodash/filter';
import _forEach from 'lodash/forEach';

function _getConstComparisonCondition(type, val1, val2, orEqualTo) {
    return {
        type: type,
        orEqualTo,
        expression1: {
            type: 'CONST',
            value: val1
        },
        expression2: {
            type: 'CONST',
            value: val2
        }
    };
}

const conditionEvaluators = {
    BETWEEN: (service, condition, instance) => {
        const val1 = service.evalExpression(condition.expression1, instance);
        const val2 = service.evalExpression(condition.expression2, instance);

        let conditionMet = false;
        if (_isArray(val2) && val2.length === 2) {
            const isGreaterThan = service.evalCondition(
                _getConstComparisonCondition('GREATER_THAN', val1, val2[0], true),
                instance
            );
            const isLessThan = service.evalCondition(
                _getConstComparisonCondition('LESS_THAN', val1, val2[1], true),
                instance
            );
            if (isGreaterThan && isLessThan) {
                conditionMet = true;
            }
        } else {
            console.warn('Cannot perform operation. Ensure condition is properly formed: ', condition);
        }
        return conditionMet;
    },
    BLANK: (service, condition, instance) => {
        const value = service.evalExpression(condition.expression, instance);
        return __blank(value);
    },
    CONTAINS: (service, condition, instance) => {
        const val1 = service.evalExpression(condition.expression1, instance);
        const val2 = service.evalExpression(condition.expression2, instance);

        let conditionMet = false;
        if (__hasValue(val1) && __hasValue(val2)) {
            conditionMet = _includes(val2, val1);
        }

        return conditionMet;
    },
    EMPTY: (service, condition, instance) => {
        const val = service.evalExpression(condition.expression, instance);
        const conditionMet = _isEmpty(val);
        return conditionMet;
    },
    EQUAL: (service, condition, instance) => {
        const val1 = service.evalExpression(condition.expression1, instance);
        const val2 = service.evalExpression(condition.expression2, instance);

        let conditionMet = false;
        if (__hasValue(val1) && __hasValue(val2)) {
            conditionMet = val1 === val2;
        }

        return conditionMet;
    },
    // TODO: Create a GREATER_THAN_OR_EQUAL_TO expression?
    GREATER_THAN: (service, condition, instance) => {
        const diff = evalNumberCondition(service, condition, instance);
        if (__hasValue(diff)) {
            return condition.orEqualTo ? diff <= 0 : diff < 0;
        }
    },
    // TODO: Create a LESS_THAN_OR_EQUAL_TO expression?
    LESS_THAN: (service, condition, instance) => {
        const diff = evalNumberCondition(service, condition, instance);
        if (__hasValue(diff)) {
            return condition.orEqualTo ? diff >= 0 : diff > 0;
        }
    }
};

function evalNumberCondition(service, condition, instance) {
    let diff;
    const val1 = service.evalExpression(condition.expression1, instance);
    const val2 = service.evalExpression(condition.expression2, instance);

    const num1 = parseFloat(val1);
    if (!Number.isNaN(num1)) {
        const num2 = parseFloat(val2);
        if (!Number.isNaN(num2)) {
            diff = num2 - num1;
        }
    }

    return diff;
}

const expressionEvaluators = {
    FORM_RESPONSE: (service, expression, instance) => {
        return instance.getModelValue(expression.id);
    },
    CONST: (service, expression, instance) => {
        return expression.value;
    },
    ADD: (service, expression, instance) => {
        let sum = 0;

        _forEach(expression.expressions, exp => {
            // TODO: Maybe this becomes FORM_RESPONSE_VALUE?
            const field = instance.getField(exp.id);
            const formResponses = service.evalExpression(exp, instance);

            if (!_isEmpty(formResponses)) {
                const selections = _filter(field.options, option => {
                    return _includes(formResponses, option.id);
                });
                _forEach(selections, selection => {
                    const valueToAdd = parseInt(selection.value, 10);
                    if (!sum) {
                        sum = valueToAdd;
                    } else {
                        sum += valueToAdd;
                    }
                });
            }
        });
        return sum;
    }
};

const ExpressionService = {
    isFormResponseExpression(expression) {
        if (!expression || !expression.type) return false;
        return expression.type === 'FORM_RESPONSE';
    },
    evalCondition(condition, instance) {
        const evaluator = conditionEvaluators[condition.type];
        if (!evaluator) {
            throw new Error(`Unmapped condition evaluator: ${condition.type}`);
        }

        let conditionMet = evaluator(this, condition, instance);
        if (__hasValue(conditionMet) && condition.not) {
            conditionMet = !conditionMet;
        }

        return conditionMet;
    },
    evalExpression(expression, instance) {
        const evaluator = expressionEvaluators[expression.type];
        if (!evaluator) {
            throw new Error(`Unmapped expression evaluator: ${expression.type}`);
        }
        return evaluator(this, expression, instance);
    }
};

export default ExpressionService;
