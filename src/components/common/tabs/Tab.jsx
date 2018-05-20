import React from 'react';
import PropTypes from 'prop-types';

function Tab({ id, style, stacked, children }) {
    return (
        <div id={id} style={style} className="full-height full-width">
            {children}
        </div>
    );
}

Tab.propTypes = {
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
    children: PropTypes.node,
    style: PropTypes.object,
    show: PropTypes.bool,
    stacked: PropTypes.bool,
    eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Tab;
