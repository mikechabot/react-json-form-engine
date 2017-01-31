import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Form from './components/form/Form';
import { CodePanel, Flex } from './components/common';
import FormEngine from './form/form-engine';
import forms from './examples/forms';
import _ from 'lodash';

class FormTester extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            key        : 0,
            form       : {},
            model      : {},
            instance   : null,
            instances  : {},
            changeEvent: {}
        };
    }

    componentDidMount () {
        this._initInstance(
            this.state.key
        );
    }

    render () {
        const { instance } = this.state;
        return (
            <Flex flex={1} column={true} padding={5}>
                <h1>react-form-engine <small style={{fontSize: '.40em'}}>Build conditional Web forms from JSON</small></h1>
                <Tabs
                    id="form-selection-tabs"
                    animation={false}
                    activeKey={this.state.key}
                    onSelect={this._handleTabSelect.bind(this)}>
                    { this._renderTabs(instance) }
                </Tabs>
            </Flex>
        );
    }

    _initInstance (key) {
        const form = forms[key];
        const { instances } = this.state;

        let instance = instances[form.id];
        if (!instance) {
            instance = new FormEngine(form, null, { liveValidation: true });
            instances[form.id] = instance;
        }

        this.setState({
            key,
            form,
            instance,
            instances,
            changeEvent: {}
        });
    }

    _renderTabs (instance) {
        return forms.map((form, index) => (
            <Tab
                key={index}
                eventKey={index}
                title={form.title}>
                { this._renderTabContent(form, index, instance) }
            </Tab>
        ));
    }

    _renderTabContent (form, index, instance) {
        if (this.state.key === index && instance) {
            return (
                <Flex padding={10} style={{flexWrap: 'wrap'}}>
                    <Flex flex={1} style={{minWidth: 400}}>
                        <Form
                            instance={instance}
                            onUpdate={this._onFormUpdate.bind(this)}
                            onSubmit={this._onSubmit.bind(this)}
                        />
                    </Flex>
                    { this._maybeRenderPanels(form, instance) }
                </Flex>
            );
        }
    }

    _maybeRenderPanels (form, instance) {
        if (instance.isValid()) {
            return (
                <Flex flex={1} column={true}>
                    <Flex>
                        <CodePanel title="Schema" content={{sections: form.sections}} />
                        <CodePanel title="UI Decorators" content={form.decorators} />
                    </Flex>
                    <Flex>
                        <CodePanel title="Model" content={{ model: instance.getModelValues() }} />
                        <CodePanel title="Change Event" content={this.state.changeEvent} />
                    </Flex>
                </Flex>
            );
        }
    }

    _handleTabSelect (eventKey) {
        const { key } = this.state;
        if (eventKey !== key) {
            this._initInstance(eventKey);
        }
    }

    _onSubmit () {
        console.log(this.state.instance);
    }

    _onFormUpdate (changeEvent) {
        const { form } = this.state;
        if (!_.isEmpty(form)) {
            this.setState({ changeEvent });
        }
    }
}

export default FormTester;
