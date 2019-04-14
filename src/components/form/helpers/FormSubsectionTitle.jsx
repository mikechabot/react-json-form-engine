import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Asterisk } from '../../util';

const FormSubsectionPanelTitle = ({ subsection, hideTitle, hideSubtitle, instance, hasError }) => {
    if (hideTitle && hideSubtitle) {
        return null;
    }

    const title = !hideTitle ? renderTitle(subsection, instance, hasError) : null;
    const subtitle = !hideSubtitle ? renderSubtitle(subsection) : null;

    if (title || subtitle) {
        return (
            <div className="panel-heading" style={{ border: 'none', borderBottom: '1px solid #dbdbdb' }}>
                {title}
                {subtitle}
            </div>
        );
    }

    return null;
};

const renderTitle = (subsection, instance, hasError) => (
    <div>
        {subsection.title}&nbsp;
        {hasError ? <Asterisk /> : null}
    </div>
);

const renderSubtitle = subsection => {
    if (subsection.subtitle) {
        return (
            <h2 className="subtitle" style={{ fontSize: '.75em', marginTop: '.25em' }}>
                <FontAwesomeIcon icon="angle-right" /> {subsection.subtitle}
            </h2>
        );
    }
};

FormSubsectionPanelTitle.propTypes = {
    subsection: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
    hasError: PropTypes.bool.isRequired,
    hideTitle: PropTypes.bool,
    hideSubtitle: PropTypes.bool
};

export default FormSubsectionPanelTitle;
