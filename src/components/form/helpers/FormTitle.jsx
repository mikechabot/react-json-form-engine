import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { Icon, Flex } from '../../util';
import FormSubmitButton from './FormSubmitButton';

const DEFAULT_THEME = 'is-dark';
const className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-5-mobile';

@inject('instance', 'hideFormTitle')
@observer
class FormTitle extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        hideFormTitle: PropTypes.bool.isRequired,
        theme: PropTypes.string
    };

    render() {
        const { instance, hideFormTitle, theme } = this.props;

        if (hideFormTitle) return null;

        return (
            <Flex
                id={`form-title-${instance.getId()}`}
                vAlignCenter
                flexShrink={0}
                justifyContent="space-between"
                className={`navbar ${theme || DEFAULT_THEME}`}
            >
                <div className="navbar-brand">
                    <span className={className}>
                        {maybeRenderIcon(instance.getFormIcon(), instance.getFormIconPrefix())}
                        <span key="label">{instance.getFormTitle()}</span>
                    </span>
                </div>
                <div className="navbar-item">
                    <FormSubmitButton />
                </div>
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

export default FormTitle;
