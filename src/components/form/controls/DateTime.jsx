import PropTypes from 'prop-types';
import React from 'react';
import Maybe from 'maybe-baby';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.min.css';

class DateTime extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
    }
    onUpdate(dateTime) {
        this.props.onUpdate(dateTime, this.props.id);
    }

    render() {
        const { id, value, field } = this.props;
        const decorators = Maybe.of(field).prop('uiDecorators');

        let props = {};
        if (decorators.isNothing()) {
            props.timeFormat = 'hh:mm A';
            props.dateFormat = 'LLL';
            props = { ...props, ...__getDefaultTimeProps() };
        } else {
            const options = decorators.join();
            if (options.hideCalendar) {
                props.showTimeSelectOnly = true;
                props.dateFormat = 'LT';
                props = { ...props, ...__getDefaultTimeProps() };
            }
        }

        return <DatePicker id={id} selected={value} onChange={this.onUpdate} {...props} />;
    }
}

const __getDefaultTimeProps = () => {
    return {
        showTimeSelect: true,
        timeIntervals: 15,
        timeCaption: 'Time'
    };
};

DateTime.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.object
};

export default DateTime;
