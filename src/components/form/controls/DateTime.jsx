import PropTypes from 'prop-types';
import React from 'react';
import Maybe from 'maybe-baby';

class DateTime extends React.Component {
    constructor (props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
    }
    onUpdate (dateTime) {
        this.props.onUpdate(dateTime, this.props.id);
    }
    render () {
        const { id, value, field } = this.props;
        const decorators = Maybe.of(field).prop('uiDecorators');
        return (
            <div>Date/Time Component!</div>
        );
    }
}

DateTime.propTypes = {
    id      : PropTypes.string.isRequired,
    field   : PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    value   : PropTypes.object
};

export default DateTime;
