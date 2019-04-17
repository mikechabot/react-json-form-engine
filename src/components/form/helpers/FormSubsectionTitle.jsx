import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Asterisk } from '../../util';
import { inject, observer } from 'mobx-react';

@inject('instance')
@observer
class FormSubsectionPanelTitle extends Component {
    render() {
        const { instance, subsection } = this.props;

        console.log('Rendering FormSubsectionPanelTitle', subsection.id);
        if (false && false) {
            return null;
        }

        const title = false ? null : (
            <div>
                {subsection.title}&nbsp;
                {instance.subsectionHasError(subsection) ? <Asterisk /> : null}
            </div>
        );

        const subtitle =
            false || !subsection.subtitle ? null : (
                <h2 className="subtitle" style={{ fontSize: '.75em', marginTop: '.25em' }}>
                    <FontAwesomeIcon icon="angle-right" /> {subsection.subtitle}
                </h2>
            );

        if (title || subtitle) {
            return (
                <div className="panel-heading" style={{ border: 'none', borderBottom: '1px solid #dbdbdb' }}>
                    {title}
                    {subtitle}
                </div>
            );
        }

        return null;
    }
}

FormSubsectionPanelTitle.propTypes = {
    subsection: PropTypes.object.isRequired
};

export default FormSubsectionPanelTitle;
