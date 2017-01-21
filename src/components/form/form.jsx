import React from 'react';
import FormSection from './form-section';
import Asterisk from '../common/Asterisk';
import { Button, TabContainer, Nav, NavItem, TabContent, TabPane } from 'react-bootstrap';

export default class Form extends React.Component {

    constructor (props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.onSign = this.onSign.bind(this);
    }

    componentDidMount () {
        const { instance } = this.props;
        instance.validate();
    }

    onUpdate (event, tag) {
        const { instance, onUpdate } = this.props;

        tag = tag || event.target.id;
        const field = instance.getField(tag);

        const { component } = field;
        const value = component.onUpdate(event, field, instance.getModelValue(tag));

        instance.setModelValue(tag, value, field);
        instance.validate();

        onUpdate({ tag, value });

        // Recalculate if necessary
        if (field.calc) {
            instance.calculateFields(field);
        }

        // Evaluate default value conditions
        instance.triggerDefaultValueEvaluation(tag);
    }

    onSign () {
        const { instance, onSign } = this.props;
        instance.validate();
        onSign();
    }

    render () {
        const { instance, logo } = this.props;
        if (!instance) {
            return (
                <em className='text-danger'>
                    No form instance
                </em>
            );
        }

        const sections = instance.getSections();
        const renderTabs = sections.length > 1;

        if (_.isEmpty(sections)) {
            return (
                <em className='text-danger'>
                    No sections
                </em>
            );
        }

        return (
            <div style={style.container}>
                <div className={'text-center'}>
                    <h4 style={{margin: 'auto'}}>{ instance.definition.title }</h4>
                    <div className={'text-right'}>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            { this._renderSignButton() }
                            { logo }
                        </div>

                    </div>
                </div>

                {
                    !renderTabs
                        ? this._renderSection(_.head(sections))
                        : this._renderTabs(sections)
                }
                <div className={'text-center'} style={{margin: '0 auto'}}>
                    { this._renderSignButton('left') }
                </div>
            </div>
        );
    }

    _renderSignButton (float) {
        const { onSign } = this.props;
        if (onSign) {
            return (
                <Button style={{margin: 10, float: float || 'none'}} bsStyle='primary' onClick={(event) => this.onSign(event)}>
                    <i className='fa fa-pencil' aria-hidden='true'></i>&nbsp;&nbsp;
                    Sign
                </Button>

            );
        }
    }

    _renderTabs (sections) {
        return (
            <TabContainer id='form-tabs' style={{display: 'flex', flexDirection: 'row', height: '100%', overflowY: 'auto'}} defaultActiveKey={0}>
                <div style={style.flex}>
                    <div style={{display: 'flex', flexDirection: 'row', height: '100%', overflowY: 'auto'}}>
                        {
                            this._renderSectionMenu(sections)
                        }
                    </div>
                    <div style={style.tabContent}>
                        {
                            this._renderSectionContent(sections)
                        }
                    </div>
                </div>
            </TabContainer>
        );
    }

    _renderSectionMenu (sections) {
        const { instance } = this.props;
        return (
            <Nav bsStyle='pills' stacked>
                {
                    sections.map((section, index) => {
                        return (
                            <NavItem key={index} eventKey={index}>
                                {
                                    instance.isError(instance.getSectionStatus(section))
                                        ? <span>{section.title}&nbsp;<Asterisk/></span>
                                        : section.title
                                }
                            </NavItem>
                        );
                    })
                }
            </Nav>
        );
    }

    _renderSectionContent (sections) {
        return (
                <TabContent className='full-height' animation={false} >
                    {
                        sections.map((section, index) => {
                            return (
                                <TabPane style={{height: '100%'}} key={index} eventKey={index}>
                                    {
                                        this._renderSection(section)
                                    }
                                </TabPane>
                            );
                        })
                    }
                </TabContent>
        );
    }

    _renderSection (section) {
        return (
            <div style={{marginY: 5, height: '100%', display: 'flex'}}>
                <FormSection
                    section={section}
                    instance={this.props.instance}
                    onUpdate={this.onUpdate} />
            </div>
        );
    }
}

const style = {
    flex: {
        display: 'flex'
    },
    container: {
        width        : '100%',
        height       : '100%',
        display      : 'flex',
        flexDirection: 'column',
        padding      : 5,
        overflowY    : 'auto',
        flex         : 1
    },
    tabContent: {
        flexGrow: 2,
        margin  : 5
    }
};

Form.propTypes = {
    onUpdate: React.PropTypes.func.isRequired,
    instance: React.PropTypes.shape({
        definition       : React.PropTypes.object.isRequired,
        model            : React.PropTypes.object.isRequired,
        sections         : React.PropTypes.array.isRequired,
        fields           : React.PropTypes.object.isRequired,
        validationResults: React.PropTypes.object.isRequired
    }).isRequired
};
