import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import FormTitle from './util/FormTitle';
import FormSection from './FormSection/';
import TabbedSections from './FormSection/TabbedSections';

@inject(
    'instance',
    'hideFormTitle',
    'hideFormBorder',
    'hideSubsectionTitles',
    'hideSubsectionSubtitles',
    'submitButtonLabel',
    'disableSubmitOnValidationError'
)
@observer
class FormConsumer extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        hideFormBorder: PropTypes.bool
    };

    renderSections(sections) {
        if (sections.length > 1) {
            return <TabbedSections />;
        }
        return <FormSection section={sections[0]} />;
    }

    getDerivedStyles(hideFormBorder) {
        return {
            border: hideFormBorder ? 'none' : '1px solid #dbdbdb',
            borderTop: 'none'
        };
    }

    render() {
        const { instance, hideFormBorder, width } = this.props;

        const style = width ? { width: this.props.width } : {};

        return (
            <div className="__rjfe__ rjfe-form-consumer" style={style}>
                <FormTitle />
                <div className="form-sections" style={this.getDerivedStyles(hideFormBorder)}>
                    {this.renderSections(instance.getSections())}
                </div>
            </div>
        );
    }
}

export default FormConsumer;
