import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FormSubsection from '../FormSubsection';
import TabbedSubsections from '../FormSubsection/TabbedSubsections';

const style = { display: 'flex', height: '100%', flexShrink: 0 };

class FormSection extends PureComponent {
    static propTypes = {
        section: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subsections: PropTypes.array.isRequired
        }).isRequired
    };
    render() {
        const { section } = this.props;
        if (!section) return null;
        return (
            <div style={style}>
                {section.subsections.length > 1 ? (
                    <TabbedSubsections section={section} />
                ) : (
                    <FormSubsection subsection={section.subsections[0]} />
                )}
            </div>
        );
    }
}

export default FormSection;
