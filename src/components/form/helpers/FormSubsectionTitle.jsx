import React from 'react';
import PropTypes from 'prop-types';

import { Asterisk } from '../../common';

const FormSubsectionTitle = ({ subsection, hasSiblings, instance, isTab }) => {
    return isTab
        ? _renderTitleAndError(subsection, instance)
        : _renderTitleAndSubtitle(subsection, hasSiblings, instance);
};

const _renderTitleAndError = (subsection, instance) => {
    return (
        <span>
            {subsection.title}&nbsp;
            {__maybeRenderError(subsection, instance)}
        </span>
    );
};

const _renderTitleAndSubtitle = (subsection, hasSiblings, instance) => {
    const hasSubtitle = !!subsection.subtitle;

    if (hasSiblings) {
        if (hasSubtitle) {
            return __renderSubtitle(subsection);
        }
        return null;
    }
    if (!hasSubtitle) {
        return __renderTitle(subsection, instance);
    }
    return (
        <span>
            {__renderTitle(subsection, instance)}
            {__renderSubtitle(subsection)}
        </span>
    );
};

const __maybeRenderError = (subsection, instance) => {
    if (instance.subsectionHasError(subsection)) {
        return <Asterisk />;
    }
};

const __renderTitle = (subsection, instance) => (
    <h1 className="title is-5">{_renderTitleAndError(subsection, instance)}</h1>
);

const __renderSubtitle = subsection => <h2 className="subtitle is-6">{subsection.subtitle}</h2>;

FormSubsectionTitle.propTypes = {
    subsection: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
    isTab: PropTypes.bool,
    hasSiblings: PropTypes.bool
};

export default FormSubsectionTitle;
