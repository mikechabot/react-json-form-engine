import React from 'react';
import FormSubsection from './FormSubsection';
import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { Flex } from '../common';

class FormSection extends React.Component {

    render () {
        const { section } = this.props;
        const { subsections } = section;

        return (
            <Flex id={section.id} width="100%">
                { this._renderSubsections(section, subsections)}
            </Flex>
        );
    }

    _renderSubsections (section, subsections) {
        return subsections.length === 1
            ? this._renderSingleSubsection(subsections[0])
            : this._renderTabs(section, subsections);
    }

    _renderTabs (section, subsections) {
        return (
            <Tabs
                id={`${section.id}-subsection-tabs`}
                defaultActiveKey={0}
                animation={false}
                style={{width: '100%'}}>
                { subsections.map(this._renderSubsectionTab.bind(this, this.props.instance)) }
            </Tabs>
        );
    }

    _renderSubsectionTab (instance, subsection, index) {
        return (
            <Tab
                key={index}
                eventKey={index}
                title={<FormSubsectionTitle subsection={subsection} instance={instance} isTab={true} />}>
                { this._renderSingleSubsection(subsection, true) }
            </Tab>
        );
    }

    _renderSingleSubsection (subsection, hideTitle) {
        const { instance, onUpdate } = this.props;
        return (
            <FormSubsection
                hideTitle={hideTitle}
                title={subsection.title}
                subsection={subsection}
                instance={instance}
                onUpdate={onUpdate}
            />
        );
    }
}

FormSection.propTypes = {
    section: React.PropTypes.shape({
        id         : React.PropTypes.string.isRequired,
        title      : React.PropTypes.string.isRequired,
        subsections: React.PropTypes.array.isRequired
    }),
    onUpdate: React.PropTypes.func.isRequired,
    instance: React.PropTypes.object.isRequired
};

export default FormSection;
