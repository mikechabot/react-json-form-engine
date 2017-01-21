import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Panel from 'react-bootstrap/lib/Panel';
import Form from './form/form';
import { CodePanel, Flex } from './common';
import FormInstanceFactory from '../form/form-instance-factory';
import forms from '../examples/forms';
import _ from 'lodash';

class FormTester extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            key        : 0,
            form       : {},
            model      : {},
            instance   : {},
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
        if (!instance.model) {
            return <span />;
        }

        return (
            <Flex flex={1} column={true} padding={5}>
                <h1>react-form-engine</h1>
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

        const { id } = form;
        const { instances } = this.state;

        let promise = new Promise((resolve, reject) => {
            let instance = instances[id];
            if (instance) {
                resolve(instance);
            } else {
                FormInstanceFactory(form, {}, null, true)
                    .then(instance => {
                        instances[id] = instance;
                        resolve(instance);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        });

        promise
            .then(instance => {
                this.setState({
                    key,
                    form,
                    instance,
                    instances,
                    changeEvent: {}
                });
            })
            .catch(error => {
                console.error(error);
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
        if (this.state.key === index) {
            return (
                <Flex padding={10}>
                    <Flex style={{minWidth: 800}}>
                        <Form
                            instance={instance}
                            onUpdate={this._onFormUpdate.bind(this)}
                            onSubmit={this._onSubmit.bind(this)}
                        />
                    </Flex>
                    <aside>
                        <Flex style={{flexWrap: 'wrap'}}>
                            <CodePanel title="Schema" content={form.schema} />
                            <CodePanel title="UI Schema" content={form.uiSchema} />
                            <CodePanel title="Model" content={instance.getModel()} />
                            <CodePanel title="Change Event" content={this.state.changeEvent} />
                        </Flex>
                    </aside>
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
        console.debug(this.state.instance);
    }

    _onFormUpdate (changeEvent) {
        const { form } = this.state;
        if (!_.isEmpty(form)) {
            this.setState({
                changeEvent
            });
        }
    }
}

export default FormTester;
