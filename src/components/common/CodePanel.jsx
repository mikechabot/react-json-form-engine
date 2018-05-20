import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import Flex from './glamorous/Flex';
import CodeBlock from './CodeBlock';

const CodePanel = ({ title, icon, content }) => {
    return (
        <Flex
            column
            flex={1}
            height="100%"
            flexShrink={0}
            className="panel m-left--xx-small m-right--xx-small"
        >
            <p className="panel-heading">
                <Icon icon={icon} />&nbsp;{title}
            </p>
            <Flex flex={1} className="panel-block" overflow="auto">
                <CodeBlock content={content} />
            </Flex>
        </Flex>
    );
};

CodePanel.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object,
    style: PropTypes.object
};

export default CodePanel;
