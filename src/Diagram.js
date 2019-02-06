import React, { Component } from 'react';
import FAIR from './FAIR.json';

const defaultValue = {
    F: "UUUUXXUXXUUU",
    A: "UUUUUUUUUUXX",
    I: "UUUUUUUUU",
    R: "UUUUXXUXXUUU"
};

const cellClass = (value) => {
    if (value === "T") return "diagram-true";
    if (value === "F") return "diagram-false";
    if (value === "X") return "diagram-blank";
    if (value === "U") return "diagram-unknown";
}

export default class Diagram extends Component {
    
    render() {
        const model = FAIR[this.props.type];
        var value = this.props.value;
        if (value === null) value = defaultValue[this.props.type];
        const rows = Object.keys(model).map((p, i) => <Row key={p} property={this.props.type + p} values={value.slice(3*i, 3*i+3)} />);
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
    const levels = ["M", "D", "A"];
    const cells = props.values.split('').map((c, i) => <Cell key={props.property + levels[i]} value={c} />)
    return (
        <tr>
            {cells}
        </tr>
    );
}

function Cell(props) {
    return <td className={cellClass(props.value)}></td>;
}