"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.EXPRESSION_TYPE = void 0;

var _common = require("../../common");

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _includes = _interopRequireDefault(require("lodash/includes"));

var _filter = _interopRequireDefault(require("lodash/filter"));

var _forEach = _interopRequireDefault(require("lodash/forEach"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _expressionEvaluators;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EXPRESSION_TYPE = {
  ADD: 'ADD',
  CONST: 'CONST',
  FORM_RESPONSE: 'FORM_RESPONSE'
};
exports.EXPRESSION_TYPE = EXPRESSION_TYPE;

function _getConstComparisonCondition(type, val1, val2, orEqualTo) {
  return {
    type: type,
    orEqualTo: orEqualTo,
    expressions: [{
      type: 'CONST',
      value: val1
    }, {
      type: 'CONST',
      value: val2
    }]
  };
}

function getExpressionMap(expressions) {
  var map = {};
  expressions.forEach(function (expression) {
    map[expression.type] = expression;
  });
  return map;
}

var conditionEvaluators = {
  BETWEEN: function BETWEEN(service, condition, instance) {
    var expressionMap = getExpressionMap(condition.expressions);
    var formResponse = service.evalExpression(expressionMap[EXPRESSION_TYPE.FORM_RESPONSE], instance);
    var array = service.evalExpression(expressionMap[EXPRESSION_TYPE.CONST], instance);
    var conditionMet = false;

    if ((0, _isArray["default"])(array) && array.length === 2) {
      var isGreaterThan = service.evalCondition(_getConstComparisonCondition('GREATER_THAN', formResponse, array[0], true), instance);
      var isLessThan = service.evalCondition(_getConstComparisonCondition('LESS_THAN', formResponse, array[1], true), instance);

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
    return (0, _common.isBlank)(value);
  },
  CONTAINS: function CONTAINS(service, condition, instance) {
    var expressionMap = getExpressionMap(condition.expressions);
    var responseValue = service.evalExpression(expressionMap[EXPRESSION_TYPE.FORM_RESPONSE], instance);
    var constValue = service.evalExpression(expressionMap[EXPRESSION_TYPE.CONST], instance);
    var conditionMet = false;

    if (!(0, _isNil["default"])(constValue) && !(0, _isNil["default"])(responseValue)) {
      conditionMet = responseValue.includes(constValue);
    }

    return conditionMet;
  },
  EMPTY: function EMPTY(service, condition, instance) {
    var val = service.evalExpression(condition.expression, instance);
    var conditionMet = (0, _isEmpty["default"])(val);
    return conditionMet;
  },
  EQUAL: function EQUAL(service, condition, instance) {
    var expressionMap = getExpressionMap(condition.expressions);
    var formResponse = service.evalExpression(expressionMap[EXPRESSION_TYPE.FORM_RESPONSE], instance);
    var constValue = service.evalExpression(expressionMap[EXPRESSION_TYPE.CONST], instance);
    var conditionMet = false;

    if (!(0, _isNil["default"])(formResponse) && !(0, _isNil["default"])(constValue)) {
      conditionMet = formResponse === constValue;
    }

    return conditionMet;
  },
  // TODO: Create a GREATER_THAN_OR_EQUAL_TO expression?
  GREATER_THAN: function GREATER_THAN(service, condition, instance) {
    var diff = evalNumberCondition(service, condition, instance);

    if (!(0, _isNil["default"])(diff)) {
      return condition.orEqualTo ? diff <= 0 : diff < 0;
    }
  },
  // TODO: Create a LESS_THAN_OR_EQUAL_TO expression?
  LESS_THAN: function LESS_THAN(service, condition, instance) {
    var diff = evalNumberCondition(service, condition, instance);

    if (!(0, _isNil["default"])(diff)) {
      return condition.orEqualTo ? diff >= 0 : diff > 0;
    }
  }
};

function evalNumberCondition(service, condition, instance) {
  var expressions = condition.expressions;
  var val1 = service.evalExpression(expressions[0], instance);
  var val2 = service.evalExpression(expressions[1], instance);
  var diff;
  var num1 = parseFloat(val1);

  if (!Number.isNaN(num1)) {
    var num2 = parseFloat(val2);

    if (!Number.isNaN(num2)) {
      diff = num2 - num1;
    }
  }

  return diff;
}

var expressionEvaluators = (_expressionEvaluators = {}, _defineProperty(_expressionEvaluators, EXPRESSION_TYPE.FORM_RESPONSE, function (service, expression, instance) {
  return instance.getModelValue(expression.id);
}), _defineProperty(_expressionEvaluators, EXPRESSION_TYPE.CONST, function (service, expression, instance) {
  return expression.value;
}), _defineProperty(_expressionEvaluators, EXPRESSION_TYPE.ADD, function (service, expression, instance) {
  var sum = 0;
  (0, _forEach["default"])(expression.expressions, function (exp) {
    // TODO: Maybe this becomes FORM_RESPONSE_VALUE?
    var field = instance.getField(exp.id);
    var formResponses = service.evalExpression(exp, instance);

    if (!(0, _isEmpty["default"])(formResponses)) {
      var selections = (0, _filter["default"])(field.options, function (option) {
        return (0, _includes["default"])(formResponses, option.id);
      });
      (0, _forEach["default"])(selections, function (selection) {
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
}), _expressionEvaluators);
var ExpressionService = {
  isFormResponseExpression: function isFormResponseExpression(expression) {
    if (!expression || !expression.type) return false;
    return expression.type === EXPRESSION_TYPE.FORM_RESPONSE;
  },
  evalCondition: function evalCondition(condition, instance) {
    var evaluator = conditionEvaluators[condition.type];

    if (!evaluator) {
      throw new Error("Unmapped condition evaluator: ".concat(condition.type));
    }

    var conditionMet = evaluator(this, condition, instance);

    if (!(0, _isNil["default"])(conditionMet) && condition.not) {
      conditionMet = !conditionMet;
    }

    return conditionMet;
  },
  evalExpression: function evalExpression(expression, instance) {
    var evaluator = expressionEvaluators[expression.type];

    if (!evaluator) {
      throw new Error("Unmapped expression evaluator: ".concat(expression.type));
    }

    return evaluator(this, expression, instance);
  }
};
var _default = ExpressionService;
exports["default"] = _default;