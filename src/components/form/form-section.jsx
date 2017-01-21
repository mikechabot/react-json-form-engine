import React from 'react';
import FormSubsection from './form-subsection';
import FormSubsectionTabTitle from './helpers/form-subsection-tab-title';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

class FormSection extends React.Component {

    render () {
        const { section } = this.props;

        const { subsections } = section;
        const renderTabs = subsections.length > 1;

        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', height: '100%'}}>
                {
                    !renderTabs
                        ? this._renderSingleSubsection(subsections)
                        : this._renderTabs(subsections)
                }
            </div>
        );
    }

    _renderTabs (subsections) {
        const { instance } = this.props;
        return (
            <Tabs animation={false} defaultActiveKey={0} id='subsection-tabs'>
                {
                    subsections.map((subsection, index) => {
                        const status = instance.getSubsectionStatus(subsection);
                        return (
                            <Tab
                                key={index}
                                eventKey={index}
                                title={<FormSubsectionTabTitle status={status} title={subsection.title} />} >
                                {
                                    this._renderSubsection(subsection, status, true)
                                }
                            </Tab>
                        );
                    })
                }
            </Tabs>
        );
    }

    _renderSingleSubsection (subsections) {
        const subsection = _.head(subsections);
        return this._renderSubsection(
            subsection,
            this.props.instance.getSubsectionStatus(subsection)
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
    section : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    instance: React.PropTypes.shape({
        definition       : React.PropTypes.object.isRequired,
        model            : React.PropTypes.object.isRequired,
        sections         : React.PropTypes.array.isRequired,
        fields           : React.PropTypes.object.isRequired,
        validationResults: React.PropTypes.object.isRequired
    }).isRequired
};

export default FormSection;
