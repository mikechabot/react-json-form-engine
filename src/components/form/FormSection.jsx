import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-tabify';

import { Flex, Asterisk } from '../util';

import FormSubsection from './FormSubsection';

class FormSection extends React.Component {
    constructor(props) {
        super(props);
        this.renderSubsectionTab = this.renderSubsectionTab.bind(this);
    }

    renderSubsections(section, subsections) {
        return subsections.length > 1
            ? this.renderTabbedSubsections(section, subsections)
            : this.renderSingleSubsection(subsections[0]);
    }

    renderTabbedSubsections(section, subsections) {
        return (
            <Tabs id={`${section.id}-subsection-tabs`} defaultActiveKey={0}>
                {subsections.map(this.renderSubsectionTab)}
            </Tabs>
        );
    }

    renderSubsectionTab(subsection, index) {
        return (
            <Tab key={index} eventKey={index} label={this.getDerivedSubsectionTitle(subsection)}>
                {this.renderSingleSubsection(subsection, true)}
            </Tab>
        );
    }

    renderSingleSubsection(subsection, isTabbed) {
        return (
            <FormSubsection
                hideTitle={isTabbed || this.props.hideTitle}
                hideSubtitle={this.props.hideSubtitle}
                isTabbed={isTabbed}
                subsection={subsection}
                instance={this.props.instance}
                onUpdate={this.props.onUpdate}
                submitButton={this.props.submitButton}
            />
        );
    }

    getDerivedSubsectionTitle(subsection) {
        if (!this.props.instance.subsectionHasError(subsection)) return subsection.title;
        return (
            <span>
                {subsection.title} <Asterisk />
            </span>
        );
    }

    render() {
        const { section } = this.props;
        const { subsections } = section;

        console.log('Render FormSection', section.id);

        return (
            <Flex id={section.id} flexShrink={0} height="100%">
                {this.renderSubsections(section, subsections)}
            </Flex>
        );
    }
}

FormSection.propTypes = {
    instance: PropTypes.object.isRequired,
    section: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subsections: PropTypes.array.isRequired
    }),
    hideTitle: PropTypes.bool,
    hideSubtitle: PropTypes.bool,
    submitButton: PropTypes.node,
    onUpdate: PropTypes.func.isRequired
};

export default FormSection;
