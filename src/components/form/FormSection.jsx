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
        const renderTabs = subsections.length > 1;

        return (
            <Flex id={section.id} width="100%">
                {
                    !renderTabs
                        ? this._renderSingleSubsection(subsections[0])
                        : this._renderTabs(subsections)
                }
            </Flex>
        );
    }

    _renderTabs (subsections) {
        const { instance } = this.props;
        return (
            <Tabs animation={false} defaultActiveKey={0} id="subsection-tabs">
                {
                    subsections.map((subsection, index) => {
                        return (
                            <Tab
                                key={index}
                                eventKey={index}
                                title={<FormSubsectionTitle subsection={subsection} instance={instance} isTab={true} />} >
                                { this._renderSubsection(subsection, true) }
                            </Tab>
                        );
                    })
                }
            </Tabs>
        );
    }

    _renderSingleSubsection (subsectionDef) {
        return this._renderSubsection(subsectionDef);
    }

    _renderSubsection (subsection, hideTitle) {
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
