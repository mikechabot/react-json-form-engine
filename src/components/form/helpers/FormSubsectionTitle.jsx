import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Asterisk } from '../../util';
import { FormConsumer } from '../../../context';

const FormSubsectionPanelTitle = ({ subsection }) => {
    console.log('Rendering FormSubsectionPanelTitle', subsection.id);
    return (
        <FormConsumer>
            {instance => {
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
                        <div
                            className="panel-heading"
                            style={{ border: 'none', borderBottom: '1px solid #dbdbdb' }}
                        >
                            {title}
                            {subtitle}
                        </div>
                    );
                }

                return null;
            }}
        </FormConsumer>
    );
};

FormSubsectionPanelTitle.propTypes = {
    subsection: PropTypes.object.isRequired
};

export default FormSubsectionPanelTitle;
