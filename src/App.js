import React from 'react';
import { Tabs, Tab } from './components/common/tabs';
import Form from './components/form/Form';
import { CodePanel, Flex } from './components/common';
import FormEngine from './form/form-engine';
import forms from './examples/forms';
import _isEmpty from 'lodash/isEmpty';
import Navbar from './components/common/bulma/Navbar';
import Footer from './components/Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            form: {},
            model: {},
            instance: null,
            instances: {},
            changeEvent: {}
        };
        this._handleTabSelect = this._handleTabSelect.bind(this);
    }

    componentDidMount() {
        this._initInstance(this.state.activeKey);
    }

    render() {
        const { instance } = this.state;
        return (
            <Flex column className="full-height">
                {this._renderHeader()}
                <Tabs
                    id="react-form-engine-example"
                    activeKey={this.state.activeKey}
                    onSelect={this._handleTabSelect}
                >
                    {this._renderTabs(instance)}
                </Tabs>
                <Footer />
            </Flex>
        );
    }

    _renderHeader() {
        return (
            <Navbar
                brand={{
                    icon: 'cloud',
                    url: 'http://www.github.com/mikechabot/react-form-engine',
                    label: 'react-form-engine'
                }}
            />
        );
    }

    _initInstance(activeKey) {
        const form = forms[activeKey];
        const { instances } = this.state;

        let instance = instances[form.id];
        if (!instance) {
            instance = new FormEngine(form, null, { liveValidation: true });
            instances[form.id] = instance;
        }

        this.setState({
            activeKey,
            form,
            instance,
            instances,
            changeEvent: {}
        });
    }

    _renderTabs(instance) {
        return forms.map((form, index) => (
            <Tab key={index} eventKey={index} label={form.title}>
                {this._renderTabContent(form, index, instance)}
            </Tab>
        ));
    }

    _renderTabContent(form, index, instance) {
        if (this.state.activeKey === index && instance) {
            return (
                <Flex padding={10} style={{ flexWrap: 'wrap' }}>
                    <Flex flex={1} style={{ minWidth: 400 }}>
                        <Form
                            instance={instance}
                            onUpdate={this._onFormUpdate.bind(this)}
                            onSubmit={this._onSubmit.bind(this)}
                        />
                    </Flex>
                    {/* {this._maybeRenderPanels(form, instance)} */}
                </Flex>
            );
        }
    }

    _maybeRenderPanels(form, instance) {
        if (instance.isValid()) {
            return (
                <Flex flex={1} column={true}>
                    <Flex>
                        <CodePanel title="Schema" content={{ sections: form.sections }} />
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

    _handleTabSelect(eventKey) {
        const { activeKey } = this.state;
        if (eventKey !== activeKey) {
            this._initInstance(eventKey);
        }
    }

    _onSubmit() {
        console.log(this.state.instance);
    }

    _onFormUpdate(changeEvent) {
        const { form } = this.state;
        if (!_isEmpty(form)) {
            this.setState({ changeEvent });
        }
    }
}

export default App;
