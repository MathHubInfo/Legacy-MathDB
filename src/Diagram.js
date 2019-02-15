import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import FAIR from './FAIR.json';

const defaultValue = {
    F: "UUUXXUXXUUUU",
    A: "UUUUUUUUUXXU",
    I: "UUUUUUUUU",
    R: "UUUUXUUUUUUU"
};

const cellClass = (value) => {
    if (value === "T") return "diagram-true";
    if (value === "M") return "diagram-somewhat";
    if (value === "F") return "diagram-false";
    if (value === "X") return "diagram-blank";
    if (value === "U") return "diagram-unknown";
}

export default class Diagram extends Component {
    
    render() {
        const model = FAIR[this.props.type];
        var value = this.props.value;
        if (value === null) value = defaultValue[this.props.type];
        const rows = Object.keys(model).filter(i => i !== "title").map((p, i) => {
            var meta = {
                id: this.props.id,
                type: this.props.type,
                item: p
            }
            return <Row key={p} meta={meta} values={value.slice(3*i, 3*i+3)} />;
        });
        return(
            <table className="diagram">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
    
}

function Row(props) {
    const levels = ["D", "A", "M"];
    const cells = props.values.split('').map((c, i) => {
        var key = props.meta.type + props.meta.item + levels[i]
        return <Cell key={key} meta = {props.meta} value={c} divId={"c" + props.meta.id + "-" + props.meta.type + props.meta.item + levels[i]} level={levels[i]} />;
    })
    return (
        <tr>
            {cells}
        </tr>
    );
}

class Cell extends Component {
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { tooltipOpen: false };
    }
    
    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }
    
    render() {
        return (
            <td className={cellClass(this.props.value)}>
                <div className="tooltip-field" id={this.props.divId}></div>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={this.props.divId} toggle={this.toggle}>
                    {FAIR[this.props.meta.type][this.props.meta.item][this.props.level]}
                </Tooltip>
            </td>
        );
    }
}