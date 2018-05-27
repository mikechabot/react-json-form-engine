'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('../../common');

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getConstComparisonCondition(type, val1, val2, orEqualTo) {
    return {
        type: type,
        orEqualTo: orEqualTo,
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

var conditionEvaluators = {
    BETWEEN: function BETWEEN(service, condition, instance) {
        var val1 = service.evalExpression(condition.expression1, instance);
        var val2 = service.evalExpression(condition.expression2, instance);

        var conditionMet = false;
        if ((0, _isArray3.default)(val2) && val2.length === 2) {
            var isGreaterThan = service.evalCondition(_getConstComparisonCondition('GREATER_THAN', val1, val2[0], true), instance);
            var isLessThan = service.evalCondition(_getConstComparisonCondition('LESS_THAN', val1, val2[1], true), instance);
            if (isGreaterThan && isLessThan) {
                conditionMet = true;
            }
        } else {
            console.warn('Cannot perform operation. Ensure condition is properly formed: ', condition);
        }
        return conditionMet;
    },
    BLANK: function BLANK(service, condition, instance) {
        var value = service.evalExpression(condition.expression, instance);
        return (0, _common.__isBlank)(value);
    },
    CONTAINS: function CONTAINS(service, condition, instance) {
        var val1 = service.evalExpression(condition.expression1, instance);
        var val2 = service.evalExpression(condition.expression2, instance);

        var conditionMet = false;
        if ((0, _common.__hasValue)(val1) && (0, _common.__hasValue)(val2)) {
            conditionMet = (0, _includes3.default)(val2, val1);
        }

        return conditionMet;
    },
    EMPTY: function EMPTY(service, condition, instance) {
        var val = service.evalExpression(condition.expression, instance);
        var conditionMet = (0, _isEmpty3.default)(val);
        return conditionMet;
    },
    EQUAL: function EQUAL(service, condition, instance) {
        var val1 = service.evalExpression(condition.expression1, instance);
        var val2 = service.evalExpression(condition.expression2, instance);

        var conditionMet = false;
        if ((0, _common.__hasValue)(val1) && (0, _common.__hasValue)(val2)) {
            conditionMet = val1 === val2;
        }

        return conditionMet;
    },
    // TODO: Create a GREATER_THAN_OR_EQUAL_TO expression?
    GREATER_THAN: function GREATER_THAN(service, condition, instance) {
        var diff = evalNumberCondition(service, condition, instance);
        if ((0, _common.__hasValue)(diff)) {
            return condition.orEqualTo ? diff <= 0 : diff < 0;
        }
    },
    // TODO: Create a LESS_THAN_OR_EQUAL_TO expression?
    LESS_THAN: function LESS_THAN(service, condition, instance) {
        var diff = evalNumberCondition(service, condition, instance);
        if ((0, _common.__hasValue)(diff)) {
            return condition.orEqualTo ? diff >= 0 : diff > 0;
        }
    }
};

function evalNumberCondition(service, condition, instance) {
    var diff = void 0;
    var val1 = service.evalExpression(condition.expression1, instance);
    var val2 = service.evalExpression(condition.expression2, instance);

    var num1 = parseFloat(val1);
    if (!Number.isNaN(num1)) {
        var num2 = parseFloat(val2);
        if (!Number.isNaN(num2)) {
            diff = num2 - num1;
        }
    }

    return diff;
}

var expressionEvaluators = {
    FORM_RESPONSE: function FORM_RESPONSE(service, expression, instance) {
        return instance.getModelValue(expression.id);
    },
    CONST: function CONST(service, expression, instance) {
        return expression.value;
    },
    ADD: function ADD(service, expression, instance) {
        var sum = 0;

        (0, _forEach3.default)(expression.expressions, function (exp) {
            // TODO: Maybe this becomes FORM_RESPONSE_VALUE?
            var field = instance.getField(exp.id);
            var formResponses = service.evalExpression(exp, instance);

            if (!(0, _isEmpty3.default)(formResponses)) {
                var selections = (0, _filter3.default)(field.options, function (option) {
                    return (0, _includes3.default)(formResponses, option.id);
                });
                (0, _forEach3.default)(selections, function (selection) {
                    var valueToAdd = parseInt(selection.value, 10);
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

var ExpressionService = {
    isFormResponseExpression: function isFormResponseExpression(expression) {
        if (!expression || !expression.type) return false;
        return expression.type === 'FORM_RESPONSE';
    },
    evalCondition: function evalCondition(condition, instance) {
        var evaluator = conditionEvaluators[condition.type];
        if (!evaluator) {
            throw new Error('Unmapped condition evaluator: ' + condition.type);
        }

        var conditionMet = evaluator(this, condition, instance);
        if ((0, _common.__hasValue)(conditionMet) && condition.not) {
            conditionMet = !conditionMet;
        }

        return conditionMet;
    },
    evalExpression: function evalExpression(expression, instance) {
        var evaluator = expressionEvaluators[expression.type];
        if (!evaluator) {
            throw new Error('Unmapped expression evaluator: ' + expression.type);
        }
        return evaluator(this, expression, instance);
    }
};

exports.default = ExpressionService;