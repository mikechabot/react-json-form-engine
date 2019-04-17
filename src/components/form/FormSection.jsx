import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-tabify';

import { Asterisk } from '../util';
import FormSubsection from './FormSubsection';
import { inject, observer } from 'mobx-react';

@inject('instance')
@observer
class FormSection extends Component {
    render() {
        const { section, onUpdate, submitButton, instance } = this.props;

        const { subsections } = section;

        console.log(this.props);

        console.log('Rendering FormSection', section.title);

        const getDerivedSubsectionTitle = subsection => {
            if (!instance.subsectionHasError(subsection)) return subsection.title;
            return (
                <span>
                    {subsection.title} <Asterisk />
                </span>
            );
        };

        const renderSingleSubsection = (subsection, isTabbed) => {
            return (
                <FormSubsection
                    isTabbed={isTabbed}
                    subsection={subsection}
                    onUpdate={onUpdate}
                    submitButton={submitButton}
                />
            );
        };

        return (
            <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
                {subsections.length === 1 ? (
                    renderSingleSubsection(subsections[0])
                ) : (
                    <Tabs id={`${section.id}-subsection-tabs`} defaultActiveKey={0}>
                        {subsections.map((subsection, index) => (
                            <Tab key={index} eventKey={index} label={getDerivedSubsectionTitle(subsection)}>
                                {renderSingleSubsection(subsection, true)}
                            </Tab>
                        ))}
                    </Tabs>
                )}
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
    submitButton: PropTypes.node,
    onUpdate: PropTypes.func.isRequired
};

export default FormSection;
