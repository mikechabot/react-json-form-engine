import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import FormTitle from './util/FormTitle';
import FormSection from './FormSection/';
import TabbedSections from './FormSection/TabbedSections';

const styles = {
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

    renderSections(sections) {
        if (sections.length > 1) {
            return <TabbedSections />;
        }
        return <FormSection section={sections[0]} />;
    }

    render() {
        const { instance } = this.props;
        return (
            <div style={styles} className="__rjfe__">
                <FormTitle />
                {this.renderSections(instance.getSections())}
            </div>
        );
    }
}

export default FormConsumer;
