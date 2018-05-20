import PropTypes from 'prop-types';
import React from 'react';
import Maybe from 'maybe-baby';
import { Flex, Icon } from '../../common';

import { __hasValue } from '../../../common/common';
import FormChildren from '../FormChildren';

class Radio extends React.Component {
    render() {
        const { id, value, field } = this.props;
        if (!field.options) {
            console.warn(`${field.type} is missing required "options" (id: ${id})`);
            return <span />;
        }
        return (
            <Flex
                column={!field.inline}
                id={id}
                style={this._hasHint(field) ? { marginBottom: 10 } : {}}
            >
                {field.options.map(this._renderOption.bind(this, field, value))}
            </Flex>
        );
    }

    _renderOption(field, value, option, index) {
        const isEven = index % 2 === 0;
        return (
            <Flex key={index} margin={5} column={true} vAlignCenter={true}>
                <Flex
                    cursor="pointer"
                    vAlignCenter={true}
                    onClick={this._handleOnClick.bind(this, field, option, isEven)}
                >
                    {this._renderOptionIcon(option, value, isEven)}&nbsp;
                    <div style={{ fontSize: 14, fontWeight: 300 }}>{option.title}</div>
                </Flex>
                <FormChildren
                    field={option}
                    instance={this.props.instance}
                    onUpdate={this.props.onUpdate}
                />
            </Flex>
        );
    }

    _renderOptionIcon(option, value, isEven) {
        return this._isChecked(option, value, isEven) ? (
            <Icon prefix="far" icon="dot-circle" />
        ) : (
            <Icon prefix="far" icon="circle" />
        );
    }

    _handleOnClick(field, option, isEven) {
        this.props.onUpdate(option.id || isEven, field.id);
    }

    _hasHint(field) {
        return Maybe.of(field)
            .prop('uiDecorators')
            .prop('hint')
            .isJust();
    }

    _isChecked(option, value, isEven) {
        if (!__hasValue(value)) return false;
        if (option.id) return option.id === value;
        return isEven ? value : !value;
    }
}

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    instance: PropTypes.object,
    field: PropTypes.object.isRequired,
    uiField: PropTypes.object,
    onUpdate: PropTypes.func.isRequired
};

export default Radio;
