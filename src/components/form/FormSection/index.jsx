import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormSubsection from '../FormSubsection';
import TabbedSubsections from '../FormSubsection/TabbedSubsections';

class FormSection extends Component {
    static propTypes = {
        section: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subsections: PropTypes.array.isRequired
        }).isRequired
    };
    render() {
        const { section } = this.props;
        if (!section) return null;
        return (
            <div className="form-section">
                {section.subsections.length > 1 ? (
                    <TabbedSubsections section={section} />
                ) : (
                    <FormSubsection subsection={section.subsections[0]} />
                )}
            </div>
        );
    }
}

export default FormSection;
