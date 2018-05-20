import PropTypes from 'prop-types';
import React from 'react';
import Asterisk from '../../common/Asterisk';

function FormSubsectionTitle({ subsection, instance, isTab }) {
    return isTab ? __renderTabTitle(subsection, instance) : __renderTitle(subsection, instance);
}

function __renderTitle(subsection, instance) {
    if (!subsection.subtitle) {
        return <div className="title is-5">{__renderTabTitle(subsection, instance)}</div>;
    } else {
        return (
            <span>
                <h1 className="title is-5">{__renderTabTitle(subsection, instance)}</h1>
                <h2 className="subtitle is-6">{subsection.subtitle}</h2>
            </span>
        );
    }
}

function __renderTabTitle(subsection, instance) {
    return (
        <span>
            {subsection.title}&nbsp;
            {__maybeRenderError(subsection, instance)}
        </span>
    );
}

function __maybeRenderError(subsection, instance) {
    if (instance.subsectionHasError(subsection)) {
        return <Asterisk />;
    }
}

FormSubsectionTitle.propTypes = {
    subsection: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
    isTab: PropTypes.bool
};

export default FormSubsectionTitle;
