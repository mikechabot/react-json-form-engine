import React from 'react';
import FormField from './form-field';
import FormSubsectionTitle from './helpers/form-subsection-title';
import Subtitle from './helpers/subtitle';
import { Flex } from '../common';
import _ from 'lodash';

class FormSubsection extends React.Component {

    render () {
        const { title, hideTitle, subsection, instance, onUpdate, validationStatus } = this.props;
        return (
            <Flex column={true}>
                <FormSubsectionTitle title={title} status={validationStatus} hide={hideTitle} />
                <Subtitle text={subsection.subtitle} />
                <ol className="simple-list">
                    {
                        _.map(subsection.fields, (field) => {
                            const tag = field.tag;
                            if (instance.evaluateShowCondition(field, tag)) {
                                return (
                                    <li key={tag} style={{margin: '20px 0px'}}>
                                        <FormField
                                            tag={tag}
                                            field={field}
                                            onUpdate={onUpdate}
                                            instance={instance}
                                            value={instance.getModelValue(tag)}
                                        />
                                    </li>
                                );
                            }
                        })
                    }
                </ol>
            </Flex>
        );
    }
}

FormSubsection.propTypes = {
    title     : React.PropTypes.string,
    subsection: React.PropTypes.object.isRequired,
    onUpdate  : React.PropTypes.func.isRequired,
    instance  : React.PropTypes.shape({
        definition       : React.PropTypes.object.isRequired,
        model            : React.PropTypes.object.isRequired,
        sections         : React.PropTypes.array.isRequired,
        fields           : React.PropTypes.object.isRequired,
        validationResults: React.PropTypes.object.isRequired
    }).isRequired
};

export default FormSubsection;
