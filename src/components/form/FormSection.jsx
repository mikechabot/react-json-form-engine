import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-tabify';

import { FormContext } from '../../context';

import { Flex, Asterisk } from '../util';
import FormSubsection from './FormSubsection';

class FormSection extends Component {

    shouldComponentUpdate(nextProps) {
        return true;
    }

    render() {
        const { section, onUpdate, submitButton } = this.props;

        const { subsections } = section;

        console.log('Rendering FormSection', section.title);

        const getDerivedSubsectionTitle = subsection => {
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

FormSection.contextType = FormContext;

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
