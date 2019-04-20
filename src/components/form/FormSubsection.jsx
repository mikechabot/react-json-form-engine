import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { Flex } from '../util';

import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import FormField from './FormField';
import FormSubmitButton from './helpers/FormSubmitButton';

@inject('instance', 'hideFormTitle', 'hideSubsectionTitles', 'hideSubsectionSubtitles')
@observer
class FormSubsection extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        subsection: PropTypes.object.isRequired,
        hideFormTitle: PropTypes.bool.isRequired
    };

    renderSubsectionFields(fields = []) {
        const { instance } = this.props;
        return fields.map(fieldDefinition => {
            const field = instance.getField(fieldDefinition.id);
            if (!instance.isVisible(field)) return null;
            return <FormField key={field.id} field={field} />;
        });
    }

    renderSubmitButton(hideFormTitle) {
        if (!hideFormTitle) return null;
        return (
            <div className="panel-block">
                <FormSubmitButton />
            </div>
        );
    }

    render() {
        const { subsection, hideFormTitle } = this.props;
        return (
            <Flex column={true} flex={1} className="panel" flexShrink={0} height="100%">
                <FormSubsectionTitle subsection={subsection} />
                <div style={{ width: '100%', height: '100%', padding: '.5em .75em' }}>
                    {this.renderSubsectionFields(subsection.fields)}
                </div>
                {this.renderSubmitButton(hideFormTitle)}
            </Flex>
        );
    }
}
export default FormSubsection;
