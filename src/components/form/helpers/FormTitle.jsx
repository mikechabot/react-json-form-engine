import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Flex } from '../../util';

const DEFAULT_THEME = 'is-dark';
const className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-5-mobile';

const FormTitle = ({ id, label, icon, iconPrefix, theme, controlsRight }) => {
    return (
        <Flex
            id={id}
            vAlignCenter
            flexShrink={0}
            justifyContent="space-between"
            className={`navbar ${theme || DEFAULT_THEME}`}
        >
            <div className="navbar-brand">
                <span className={className}>
                    {_maybeRenderIcon(icon, iconPrefix)}
                    {_renderLabel(label)}
                </span>
            </div>
            {_maybeRenderControlsRight(controlsRight)}
        </Flex>
    );
};

const _maybeRenderIcon = (icon, iconPrefix) => {
    if (icon) {
        return (
            <span key="icon">
                <Icon icon={icon} prefix={iconPrefix} />
                &nbsp;
            </span>
        );
    }
};

const _renderLabel = label => {
    return <span key="label">{label}</span>;
};

const _maybeRenderControlsRight = controls => {
    if (controls) {
        return <div className="navbar-item">{controls}</div>;
    }
};

FormTitle.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    icon: PropTypes.string,
    iconPrefix: PropTypes.string,
    theme: PropTypes.string,
    controlsRight: PropTypes.node
};

export default FormTitle;
