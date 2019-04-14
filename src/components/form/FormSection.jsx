import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-tabify';

import FormSubsection from './FormSubsection';
import { Flex, Asterisk } from '../util';

class FormSection extends React.Component {
    constructor(props) {
        super(props);
        this._renderSubsectionTab = this._renderSubsectionTab.bind(this);
    }
    render() {
        const { section } = this.props;
        const { subsections } = section;

        console.log('Render FormSection');

        return (
            <Flex id={section.id} flexShrink={0} height="100%">
                {this._renderSubsections(section, subsections)}
            </Flex>
        );
    }

    _renderSubsections(section, subsections) {
        return subsections.length > 1
            ? this._renderTabbedSubsections(section, subsections)
            : this._renderSingleSubsection(subsections[0]);
    }

    _renderTabbedSubsections(section, subsections) {
        return (
            <Tabs id={`${section.id}-subsection-tabs`} defaultActiveKey={0}>
                {subsections.map(this._renderSubsectionTab)}
            </Tabs>
        );
    }

    _renderSubsectionTab(subsection, index) {
        return (
            <Tab key={index} eventKey={index} label={this._getDerivedSubsectionTitle(subsection)}>
                {this._renderSingleSubsection(subsection, true)}
            </Tab>
        );
    }

    _renderSingleSubsection(subsection, isTabbed) {
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

    _getDerivedSubsectionTitle(subsection) {
        if (!this.props.instance.subsectionHasError(subsection)) return subsection.title;
        return (
            <span>
                {subsection.title} <Asterisk />
            </span>
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
