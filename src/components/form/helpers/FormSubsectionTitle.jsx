import React from 'react';
import PropTypes from 'prop-types';

import { Asterisk, Icon } from '../../common';

const FormSubsectionPanelTitle = ({ subsection, hideTitle, hideSubtitle, instance }) => {
    if (hideTitle && hideSubtitle) {
        return null;
    }

    const title = !hideTitle ? __renderTitle(subsection, instance) : null;
    const subtitle = !hideSubtitle ? __renderSubtitle(subsection) : null;

    if (title || subtitle) {
        return (
            <div className="panel-heading">
                {title}
                {subtitle}
            </div>
        );
    }

    return null;

};

const __maybeRenderError = (subsection, instance) => {
    if (instance.subsectionHasError(subsection)) {
        return <Asterisk />;
    }
};

const __renderTitle = (subsection, instance) => (
    <h1 className="title is-5">
        {subsection.title}&nbsp;
        {__maybeRenderError(subsection, instance)}
    </h1>
);

const __renderSubtitle = subsection => {
    if (subsection.subtitle) {
        return (
            <h2 className="subtitle is-6">
                <Icon icon="angle-right" />&nbsp;
                {subsection.subtitle}
            </h2>
        );
    }
};

FormSubsectionPanelTitle.propTypes = {
    subsection: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
    hideTitle: PropTypes.bool,
    hideSubtitle: PropTypes.bool
};

export default FormSubsectionPanelTitle;
