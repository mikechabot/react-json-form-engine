import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import FormSubsection from './FormSubsection';
import TabbedSubsections from './TabbedSubsections';

@inject('instance', 'hideSubsectionTitles')
@observer
class FormSection extends Component {
    renderSection(section) {
        if (section.subsections.length > 1) return <TabbedSubsections section={section} />;
        return <FormSubsection subsection={section.subsections[0]} submitButton={this.props.submitButton} />;
    }

    render() {
        const { section, hideSubsectionTitles } = this.props;

        console.log('Rendering FormSection', section.title, hideSubsectionTitles);

        return (
            <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
                {this.renderSection(section)}
            </div>
        );
    }
}

FormSection.propTypes = {
    section: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subsections: PropTypes.array.isRequired
    }),
    hideSubsectionTitles: PropTypes.bool.isRequired,
    submitButton: PropTypes.node
};

export default FormSection;
