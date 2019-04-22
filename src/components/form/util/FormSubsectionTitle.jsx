import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Asterisk } from '../../util';
import { inject, observer } from 'mobx-react';

const styles = {
    subtitle: {
        fontSize: '.75em',
        marginTop: '.25em'
    },
    heading: {
        border: 'none',
        borderBottom: '1px solid #dbdbdb'
    }
};

@inject('instance', 'hideSubsectionTitles', 'hideSubsectionSubtitles')
@observer
class FormSubsectionTitle extends Component {
    static propTypes = {
        isTabbed: PropTypes.bool,
        subsection: PropTypes.object.isRequired,
        hideSubsectionTitles: PropTypes.bool.isRequired,
        hideSubsectionSubtitles: PropTypes.bool.isRequired
    };

    getTitle(instance, subsection, isTabbed, hideSubsectionTitles) {
        if (isTabbed || hideSubsectionTitles) return null;
        return (
            <div>
                {subsection.title}&nbsp;
                {instance.validationMap.subsections[subsection.id] ? <Asterisk /> : null}
            </div>
        );
    }

    getSubsection(subsection, hideSubsectionSubtitles) {
        if (!subsection.subtitle || hideSubsectionSubtitles) return null;
        return (
            <h2 className="subtitle" style={styles.subtitle}>
                <FontAwesomeIcon icon="angle-right" /> {subsection.subtitle}
            </h2>
        );
    }

    render() {
        const { instance, subsection, isTabbed, hideSubsectionTitles, hideSubsectionSubtitles } = this.props;

        if (hideSubsectionTitles && hideSubsectionSubtitles) {
            return null;
        }

        const title = this.getTitle(instance, subsection, isTabbed, hideSubsectionTitles);
        const subtitle = this.getSubsection(subsection, hideSubsectionSubtitles);

        if (!(subtitle || title)) return null;

        return (
            <div className="panel-heading" style={styles.heading}>
                {title}
                {subtitle}
            </div>
        );
    }
}

export default FormSubsectionTitle;
