import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Asterisk } from '../../util';
import { inject, observer } from 'mobx-react';

@inject('instance', 'hideSubsectionTitles', 'hideSubsectionSubtitles')
@observer
class FormSubsectionPanelTitle extends Component {
    static propTypes = {
        subsection: PropTypes.object.isRequired,
        hideSubsectionTitles: PropTypes.bool.isRequired,
        hideSubsectionSubtitles: PropTypes.bool.isRequired
    };
    render() {
        const { instance, subsection, hideSubsectionTitles, hideSubsectionSubtitles } = this.props;

        console.log('FormSubsectionPanelTitle', hideSubsectionTitles);

        console.log('Rendering FormSubsectionPanelTitle', subsection.id);
        if (hideSubsectionTitles && hideSubsectionSubtitles) {
            return null;
        }

        const title = hideSubsectionTitles ? null : (
            <div>
                {subsection.title}&nbsp;
                {instance.validationMap.subsections[subsection.id] ? <Asterisk /> : null}
            </div>
        );

        const subtitle =
            hideSubsectionSubtitles || !subsection.subtitle ? null : (
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

export default FormSubsectionPanelTitle;
