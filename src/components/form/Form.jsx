import React from 'react';
import FormSection from './FormSection';
import _ from 'lodash';
import { Flex, Asterisk, APICheckError } from '../common';
import { Button, TabContainer, Nav, NavItem, TabContent, TabPane } from 'react-bootstrap';

export default class Form extends React.Component {

    constructor (props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount () {
        const { instance } = this.props;
        instance.validate();
    }

    render () {
        const { instance } = this.props;
        // No instance
        if (!instance || _.isEmpty(instance)) {
            return <em className="text-danger">No form instance</em>;
        }
        // Invalid definition
        if (!instance.isValid()) {
            return <APICheckError error={instance.error} />;
        }
        // No sections
        if (instance.getSections().isEmpty()) {
            return <em className="text-danger">No sections</em>;
        }
        return (
            <Flex
                id={instance.getId()}
                column={true}
                hAlignCenter={true}
                flex={1}>
                { this._renderForm(instance.getSections()) }
                <div>
                    <Button bsStyle="primary" onClick={this.props.onSubmit}>
                        { this.props.submitButtonLabel || 'Submit' }
                    </Button>
                </div>
            </Flex>
        );
    }

    _renderForm (sections) {
        return sections.count() > 1
            ? this._renderTabs(sections)
            : this._renderSection(sections.values()[0]);
    }

    _renderTabs (sections) {
        return (
            <TabContainer id={`form-tabs-${this.props.instance.getId()}`} defaultActiveKey={0}>
                <Flex width="100%">
                    <aside style={{width: this.props.sectionMenuWidth || 150}}>
                        { this._renderSectionMenu(sections) }
                    </aside>
                    <Flex flex={1}>
                        { this._renderSectionContent(sections) }
                    </Flex>
                </Flex>
            </TabContainer>
        );
    }

    _renderSectionMenu (sections) {
        return (
            <Nav bsStyle="pills" stacked>
                { this._renderMenuItems(sections) }
            </Nav>
        );
    }

    _renderMenuItems (sections) {
        return sections.values().map(this._renderMenuItem.bind(this));
    }

    _renderMenuItem (section, index) {
        const { instance } = this.props;
        return (
            <NavItem key={index} eventKey={index}>
                { section.title }&nbsp;
                { instance.sectionHasError(section) ? <Asterisk/> : '' }
            </NavItem>
        );
    }

    _renderSectionContent (sections) {
        return (
            <TabContent style={{width: '100%'}} animation={false} >
                { sections.values().map(this._renderTabPane.bind(this)) }
            </TabContent>
        );
    }

    _renderTabPane (section, index) {
        return (
            <TabPane key={index} eventKey={index}>
                { this._renderSection(section) }
            </TabPane>
        );
    }

    _renderSection (section) {
        return (
            <FormSection
                section={section}
                instance={this.props.instance}
                onUpdate={this.onUpdate} />
        );
    }

    onUpdate (event, id) {
        const { instance, onUpdate } = this.props;

        id = id || event.target.id;
        const field = instance.getField(id);

        const value = field.actions.onUpdate(event, field, instance.getModelValue(id));

        instance.setModelValue(id, value, field);     // Set model value
        // instance.calculateFields(field);               // Calculate fields if necessary
        // instance.triggerDefaultValueEvaluation(tag);   // Trigger default value evaluation
        if (instance.isLiveValidation()) {
            instance.validate();                        // Validate the form
        }
        onUpdate({ id, value });                      // Notify parent
    }
}

Form.propTypes = {
    onUpdate        : React.PropTypes.func,
    onSubmit        : React.PropTypes.func.isRequired,
    instance        : React.PropTypes.object.isRequired,
    sectionMenuWidth: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]),
    submitButtonLabel: React.PropTypes.string
};
