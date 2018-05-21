import React from 'react';
import PropTypes from 'prop-types';

import { CodePanel, Flex } from './components/common';

const AppPanels = ({ instance, form }) => {
    if (instance.isValid()) {
        return (
            <Flex flex={1} column={true}>
                <Flex flex={1} flexShrink={0} overflow="hidden" className="m-bottom--x-small">
                    <CodePanel
                        icon="database"
                        title="Model"
                        content={{ model: instance.getModelValues() }}
                    />
                    <CodePanel icon="map-marker" title="UI Decorators" content={form.decorators} />
                </Flex>
                <Flex flex={1} flexShrink={0} overflow="hidden">
                    <CodePanel icon="map" title="JSON Schema" content={{ sections: form.sections }} />
                </Flex>
            </Flex>
        );
    }
};

AppPanels.propTypes = {
    instance: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired
};

export default AppPanels;
