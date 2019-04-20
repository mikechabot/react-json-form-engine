import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import FormSection from './FormSection';
import FormTitle from './helpers/FormTitle';
import TabbedSections from './tabbed/TabbedSections';

const formContainer = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexShrink: 0,
    border: '1px solid #dbdbdb'
};

@inject('instance', 'hideFormTitle', 'hideSubsectionTitles', 'hideSubsectionSubtitles', 'submitButtonLabel')
@observer
class FormConsumer extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        hideFormTitle: PropTypes.bool.isRequired,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    render() {
        const { instance } = this.props;
        return (
            <div style={formContainer}>
                <FormTitle />
                {instance.sections.length > 1 ? (
                    <TabbedSections />
                ) : (
                    <FormSection section={instance.sections[0]} />
                )}
            </div>
        );
    }
}

export default FormConsumer;
