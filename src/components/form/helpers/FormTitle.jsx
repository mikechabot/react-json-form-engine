import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Flex } from '../../util';

const DEFAULT_THEME = 'is-dark';
const className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-5-mobile';

class FormTitle extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.label !== this.props.label;
    }

    render() {
        const { id, theme, iconPrefix, icon, label, controlsRight } = this.props;
        console.log('Rendering FormTitle', id);
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
                        {maybeRenderIcon(icon, iconPrefix)}
                        <span key="label">{label}</span>
                    </span>
                </div>
                {controlsRight ? <div className="navbar-item">{controlsRight}</div> : null}
            </Flex>
        );
    }
}

const maybeRenderIcon = (icon, iconPrefix) => {
    if (icon) {
        return (
            <span key="icon">
                <Icon icon={icon} prefix={iconPrefix} />
                &nbsp;
            </span>
        );
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
