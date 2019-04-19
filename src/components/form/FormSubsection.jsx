import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Flex } from '../util';

import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import FormField from './FormField';
import { inject, observer } from 'mobx-react';

@inject('instance', 'hideSubsectionTitles')
@observer
class FormSubsection extends Component {
    renderSubsectionFields(fields = []) {
        const { instance } = this.props;
        return fields.map(fieldDefinition => {
            const field = this.props.instance.getField(fieldDefinition.id);
            if (!instance.isVisible(field)) return null;
            return <FormField key={field.id} fieldId={field.id} field={field} />;
        });
    }

    render() {
        const { subsection, submitButton } = this.props;

        console.log('Rendering FormSubsection', subsection.id, this.props.hideSubsectionTitles);

        return (
            <Flex column={true} flex={1} className="panel" flexShrink={0} height="100%">
                <FormSubsectionTitle
                    subsection={subsection}
                    hideSubsectionTitles={this.props.hideSubsectionTitles}
                />
                <div style={{ width: '100%', height: '100%', padding: '.5em .75em' }}>
                    {this.renderSubsectionFields(subsection.fields)}
                </div>
                {submitButton ? <div className="panel-block">{submitButton}</div> : null}
            </Flex>
        );
    }
}

FormSubsection.propTypes = {
    subsection: PropTypes.object.isRequired,
    hideSubsectionTitles: PropTypes.bool.isRequired,
    submitButton: PropTypes.node
};

export default FormSubsection;
