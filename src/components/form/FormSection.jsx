import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-tabify';

import FormSubsection from './FormSubsection';
import { Flex, Asterisk } from '../common';

class FormSection extends React.Component {
    constructor(props) {
        super(props);
        this._renderSubsectionTab = this._renderSubsectionTab.bind(this);
    }
    render() {
        const { section } = this.props;
        const { subsections } = section;

        return (
            <Flex id={section.id} flexShrink={0}>
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

    _renderSingleSubsection(subsection, hasSiblings) {
        return (
            <FormSubsection
                hideTitle={hasSiblings || this.props.hideTitle}
                hideSubtitle={this.props.hideSubtitle}
                subsection={subsection}
                instance={this.props.instance}
                onUpdate={this.props.onUpdate}
                submitButton={this.props.submitButton}
            />
        );
    }

    _getDerivedSubsectionTitle(subsection) {
        let label = subsection.title;
        if (this.props.instance.subsectionHasError(subsection)) {
            label = (
                <span>
                    {label} <Asterisk />
                </span>
            );
        }
        return label;
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
