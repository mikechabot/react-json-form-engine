import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const DEFAULT_THEME = 'is-dark';
const className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-6-mobile';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
        this._toggleMenu = this._toggleMenu.bind(this);
    }
    render() {
        const { id, theme, controlsRight } = this.props;
        return (
            <nav id={id} className={`navbar is-transparent ${theme || DEFAULT_THEME}`}>
                <div className="navbar-brand">
                    {this._renderBrand()}
                    {this._maybeRenderControlsRightContainer(controlsRight)}
                </div>
                {this._maybeRenderControlsRight(controlsRight)}
            </nav>
        );
    }

    _renderBrand() {
        const { url } = this.props;
        const children = this._renderIconAndLabel();
        if (url) {
            return (
                <a href={url} className={className}>
                    {children}
                </a>
            );
        }
        return <span className={className}>{children}</span>;
    }

    _renderIconAndLabel() {
        const { icon, iconPrefix, label } = this.props;
        return [_renderIcon(icon, iconPrefix), _renderSpacer(), _renderLabel(label)];
    }

    _maybeRenderControlsRightContainer(controls) {
        if (controls) {
            return (
                <div
                    className={`navbar-burger burger ${this.state.showMenu ? 'is-active' : ''}`}
                    data-target="navbar-controls-right"
                    onClick={this._toggleMenu}
                >
                    <span />
                    <span />
                    <span />
                </div>
            );
        }
    }
    _maybeRenderControlsRight(controls) {
        if (controls) {
            return (
                <div
                    id={`${this.props.id}-controls-right`}
                    className={`navbar-menu ${this.state.showMenu ? 'is-active' : ''}`}
                >
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <div className="control">{controls}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    _toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu });
    }
}

const _renderIcon = (icon, iconPrefix) => {
    if (icon) {
        return (
            <span key="icon">
                <Icon icon={icon} prefix={iconPrefix} />
            </span>
        );
    }
};

const _renderLabel = label => {
    return <span key="label">{label}</span>;
};

const _renderSpacer = () => <span key="spacer">&nbsp;</span>;

Navbar.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    theme: PropTypes.string,
    iconPrefix: PropTypes.string,
    label: PropTypes.node.isRequired,
    controlsRight: PropTypes.node,
    url: PropTypes.string
};

export default Navbar;
