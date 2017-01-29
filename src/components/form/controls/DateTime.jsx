import React from 'react';
import Maybe from 'maybe-baby';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

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
            <DateTimePicker
                id={id}
                style={{ marginRight: 40 }}
                calendar={!decorators.prop('hideCalendar').isJust()}
                time={!decorators.prop('hideTime').isJust()}
                value={value}
                onChange={this.onUpdate}
            />
        );
    }
}

DateTime.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.object
};

export default DateTime;
