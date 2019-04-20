import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormSubsection from './FormSubsection';
import TabbedSubsections from './tabbed/TabbedSubsections';

class FormSection extends Component {
    static propTypes = {
        section: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subsections: PropTypes.array.isRequired
        })
    };
    render() {
        const { section } = this.props;
        return (
            <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
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
