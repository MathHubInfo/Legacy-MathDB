import React, { Component } from 'react';

const defaultValue = {
    F: "UUUUXXUXXUUU",
    A: "UUUUUUUUUUXX",
    I: "UUUUUUUUU",
    R: "UUUUXXUXXUUU"
};
const levels = ["M", "D", "A"];

const mapping = { // for reference
    F: {
        1:  ["M", "D", "A"],
        2:  ["M", "X", "X"],
        3:  ["M", "X", "X"],
        4:  ["M", "D", "A"]
    },
    A: {
        1:  ["M", "D", "A"],
        11: ["M", "D", "A"],
        12: ["M", "D", "A"],
        2:  ["M", "X", "X"]
    },
    I: {
        1:  ["M", "D", "A"],
        2:  ["M", "D", "A"],
        3:  ["M", "D", "A"]
    },
    R: {
        1:  ["M", "D", "A"],
        11: ["M", "X", "X"],
        12: ["M", "X", "X"],
        13: ["M", "D", "A"]
    }
};

const cellClass = (value) => {
    if (value === "T") return "diagram-true";
    if (value === "F") return "diagram-false";
    if (value === "X") return "diagram-blank";
    if (value === "U") return "diagram-unknown";
}

export default class Diagram extends Component {
    
    render() {
        const model = mapping[this.props.type];
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