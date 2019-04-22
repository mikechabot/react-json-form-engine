import PropTypes from 'prop-types';
import React from 'react';
import Maybe from 'maybe-baby';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.min.css';

const DEFAULT = {
    TIME_FORMAT: 'h:mm aa',
    DATE_FORMAT: 'MMMM d, yyyy h:mm aa',
    TIME_INTERVAL: 15
};

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

        let newProps = {
            value,
            timeFormat: decorators
                .prop('timeFormat')
                .orElse(DEFAULT.TIME_FORMAT)
                .join(),
            dateFormat: decorators
                .prop('dateFormat')
                .orElse(DEFAULT.DATE_FORMAT)
                .join(),
            timeIntervals: decorators
                .prop('timeInterval')
                .orElse(DEFAULT.TIME_INTERVAL)
                .join()
        };

        if (decorators.isNothing()) {
            newProps = { ...getDefaultProps(), ...newProps };
        } else {
            const options = decorators.join();
            if (options.hideCalendar) {
                newProps = {
                    ...newProps,
                    ...getDefaultProps(),
                    showTimeSelectOnly: true,
                    dateFormat: newProps.timeFormat
                };
            }
        }

        console.log(id, decorators.join(), newProps);

        console.log(value);

        return <DatePicker id={id} selected={value} onChange={this.onUpdate} {...newProps} />;
    }
}

const getDefaultProps = () => {
    return {
        showTimeSelect: true,
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
