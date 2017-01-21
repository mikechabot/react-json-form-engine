import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

class DateTime extends React.Component {
    constructor (props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
    }
    onUpdate (dateTime) {
        this.props.onUpdate(dateTime, this.props.tag);
    }
    render () {
        const { tag, value, field } = this.props;
        return (
            <DateTimePicker
                id={tag}
                style={{ marginRight: 40 }}
                calendar={!field.hideCalendar}
                time={!field.hideTime}
                value={value}
                onChange={this.onUpdate}
            />
        );
    }
}

DateTime.propTypes = {
    tag     : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.object
};

export default DateTime;
