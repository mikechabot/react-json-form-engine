import React from 'react';
import FormField from './FormField';
import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import Subtitle from './helpers/Subtitle';
import { Flex } from '../common';
import _ from 'lodash';

class FormSubsection extends React.Component {

    render () {
        const { hideTitle, subsection, instance, onUpdate } = this.props;
        return (
            <Flex column={true} flex={1}>
                { this._maybeRenderSubsectionTitle(subsection, instance, hideTitle) }
                { this._maybeRenderSubsectionSubtitle(subsection.subtitle, hideTitle)}
                <ol className="simple-list">
                    { _.map(subsection.fields, this._renderSubsectionField.bind(this, instance, onUpdate)) }
                </ol>
            </Flex>
        );
    }

    _renderSubsectionField (instance, onUpdate, fieldDef, index) {
        const field = instance.getField(fieldDef.id);
        if (instance.evaluateFieldShowCondition(field)) {
            return (
                <li key={index}
                    style={{marginTop: 10}}>
                    <FormField
                        id={field.id}
                        field={field}
                        onUpdate={onUpdate}
                        instance={instance}
                        value={instance.getModelValue(field.id)}
                    />
                </li>
            );
        }
    }

    _maybeRenderSubsectionTitle (subsection, instance, hideTitle) {
        if (!hideTitle) {
            return <FormSubsectionTitle
                subsection={subsection}
                instance={instance}
            />;
        }
    }

    _maybeRenderSubsectionSubtitle (subtitle, hideTitle) {
        if (subtitle) {
            return (
                <div
                    style={{
                        marginLeft: '1em',
                        ...hideTitle ? { marginTop: 10 } : {}}}>
                    <Subtitle text={subtitle} />
                </div>
            );
        }
    }

}

FormSubsection.propTypes = {
    title     : React.PropTypes.string,
    subsection: React.PropTypes.object.isRequired,
    onUpdate  : React.PropTypes.func.isRequired,
    instance  : React.PropTypes.object.isRequired
};

export default FormSubsection;
