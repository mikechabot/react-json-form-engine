import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import FormTitle from './util/FormTitle';
import FormSection from './FormSection';
import TabbedSections from './TabbedSections';

const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexShrink: 0,
    border: '1px solid #dbdbdb'
};

const FormSections = ({ sections }) => {
    if (sections.length > 1) {
        return <TabbedSections />;
    }
    return <FormSection section={sections[0]} />;
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
            <div style={style}>
                <FormTitle />
                <FormSections sections={instance.getSections()} />
            </div>
        );
    }
}

export default FormConsumer;
