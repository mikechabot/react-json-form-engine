import React from 'react';
import FormSection from './FormSection';
import _ from 'lodash';
import { Flex, Asterisk, APICheckError } from '../common';
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'react-bootstrap';

export default class Form extends React.Component {

    constructor (props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount () {
        // const { instance } = this.props;
        // instance.validate();
    }

    render () {
        const { instance } = this.props;

        if (!instance || _.isEmpty(instance)) {
            return <em className="text-danger">No form instance</em>;
        }

        if (!instance.isValid()) {
            return <APICheckError error={instance.error} />;
        }

        const sections = instance.getSections();
        if (sections.isEmpty()) {
            return <em className="text-danger">No sections</em>;
        }

        return (
            <Flex column={true} flex={1}>
                { this._renderForm(sections) }
            </Flex>
        );
    }

    _renderForm (sections) {
        return sections.count() > 1
            ? this._renderTabs(sections)
            : this._renderSection(_.head(sections.values()));
    }

    _renderTabs (sections) {
        return (
            <TabContainer id="form-tabs" defaultActiveKey={0}>
                <Flex>
                    <aside style={{width: 150}}>
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
                {
                    instance.sectionHasError(section)
                        ? <span>{section.title}&nbsp;<Asterisk/></span>
                        : section.title
                }
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
        instance.validate();                           // Validate the form

        onUpdate({ id, value });                      // Notify parent
    }
}

Form.propTypes = {
    onUpdate: React.PropTypes.func.isRequired,
    instance: React.PropTypes.object.isRequired
};
