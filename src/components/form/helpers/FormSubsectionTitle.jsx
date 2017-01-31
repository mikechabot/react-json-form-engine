import React from 'react';
import Asterisk from '../../common/Asterisk';

export default function FormSubsectionTitle ({
    subsection,
    instance,
    isTab
}) {
    return isTab
        ? __renderTabTitle(subsection, instance)
        : __renderTitle(subsection, instance);
}

function __renderTitle (subsection, instance) {
    return (
        <h4 style={{marginBottom: 5, marginLeft: 5}}>
            { __renderTabTitle(subsection, instance) }
        </h4>
    );
}

function __renderTabTitle (subsection, instance) {
    return (
        <span>
            { __getTitle(subsection) }
            { __maybeRenderError(subsection, instance) }
        </span>
    );
}

function __getTitle (subsection) {
    return subsection.title + ' ';
}

function __maybeRenderError (subsection, instance) {
    if (instance.subsectionHasError(subsection)) {
        return <Asterisk />;
    }
}

FormSubsectionTitle.propTypes = {
    subsection: React.PropTypes.object.isRequired,
    instance  : React.PropTypes.object.isRequired,
    isTab     : React.PropTypes.bool
};
