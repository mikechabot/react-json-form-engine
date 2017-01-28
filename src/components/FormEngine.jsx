import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Form from './form/form';
import { CodePanel, Flex } from './common';
import FormEngine from '../form/form-engine';
import forms from '../examples/forms';
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
        const { instances } = this.state;

        let instance = instances[form.id];
        if (!instance) {
            instance = new FormEngine(form, {}, null, true);
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
                <Flex padding={10}>
                    <Flex style={{minWidth: 700}}>
                        <Form
                            instance={instance}
                            onUpdate={this._onFormUpdate.bind(this)}
                            onSubmit={this._onSubmit.bind(this)}
                        />
                    </Flex>
                    <aside>
                        {/*<Flex style={{flexWrap: 'wrap'}}>*/}
                            {/*<CodePanel title="Schema" content={form.schema} />*/}
                            {/*<CodePanel title="UI Schema" content={form.uiSchema} />*/}
                            {/*<CodePanel title="Model" content={instance.getModel()} />*/}
                            {/*<CodePanel title="Change Event" content={this.state.changeEvent} />*/}
                        {/*</Flex>*/}
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
