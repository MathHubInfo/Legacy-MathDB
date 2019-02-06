import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import FAIR from './FAIR.json';

export default class LegendCell extends Component {
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { tooltipOpen: false };
    }

    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }
    
    getText(value) {
        if (value.length === 2) return value;
        else return value.substring(0, 2) + "." + value.substring(2);
    }
    
    getTooltip(value) {
        const info = FAIR[value.substring(0, 1)][value.substring(1)]
        return (typeof(info) !== 'undefined' ? info.title : "")
    }
    
    getURL(value) {
        const info = FAIR[value.substring(0, 1)][value.substring(1)]
        return (typeof(info) !== 'undefined' ? info.url : "")
    }
    
    render() {
        var cls = "lrow"
        if ( typeof(this.props.cls) !== 'undefined' || this.props.cls != null || this.props.cls !== "")
            cls = cls + " " + this.props.cls;
        return(
            <td className={cls}>
                <a href={this.getURL(this.props.value)} id={this.props.value}>{this.getText(this.props.value)}</a>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={this.props.value} toggle={this.toggle}>{this.getTooltip(this.props.value)}</Tooltip>
            </td>
        );
    }
    
}