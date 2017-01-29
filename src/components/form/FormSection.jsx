import React from 'react';
import FormSubsection from './FormSubsection';
import FormSubsectionTabTitle from './helpers/form-subsection-tab-title';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

class FormSection extends React.Component {

    render () {
        const { section } = this.props;
        const { subsections } = section;
        const renderTabs = subsections.length > 1;

        return (
            <div id={section.id} style={{flex: 1, display: 'flex', flexDirection: 'column', height: '100%'}}>
                {
                    !renderTabs
                        ? this._renderSingleSubsection(subsections[0])
                        : this._renderTabs(subsections)
                }
            </div>
        );
    }

    _renderTabs (subsections) {
        const { instance } = this.props;
        return (
            <Tabs animation={false} defaultActiveKey={0} id="subsection-tabs">
                {
                    subsections.map((subsectionDef, index) => {
                        const subsection = instance.getSubsection(subsectionDef.id);
                        return (
                            <Tab
                                key={index}
                                eventKey={index}
                                title={<FormSubsectionTabTitle status={status} title={subsection.title} />} >
                                { this._renderSubsection(subsection, status, true) }
                            </Tab>
                        );
                    })
                }
            </Tabs>
        );
    }

    _renderSingleSubsection (subsectionDef) {
        return this._renderSubsection(
            this.props.instance.getSubsection(subsectionDef.id)
        );
    }

    _renderSubsection (subsection, status, hideTitle) {
        const { instance, onUpdate } = this.props;
        return (
            <FormSubsection
                validationStatus={status}
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
