import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

export default class HeaderWithTooltip extends Component {
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { tooltipOpen: false };
    }

    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }
    
    render() {
        return(
            <div>
                <span href="#" id={this.props.id}>{this.props.text}</span>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={this.props.id} toggle={this.toggle}>{this.props.tooltip}</Tooltip>
            </div>
        );
    }
    
}