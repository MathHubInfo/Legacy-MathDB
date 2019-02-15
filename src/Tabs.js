import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Row, Col } from 'reactstrap';

const tabs = [
    {
        "id": "general", 
        "label": "General Information"
    },
    {
        "id": "size",
        "label": "Size Information"
    },
    {
        "id": "FAIR",
        "label": "FAIR Readiness"
    },
    {
        "id": "properties", 
        "label": "Collection Properties"
    }
];

export default class Tabs extends Component {
    
    render() {
        const navButtons = tabs.map((item) => 
            <Button size="sm"
                key={item.id}
                onClick={() => this.props.toggleDisplay(item.id)} 
                active={this.props.active === item.id}>
                    {item.label}
            </Button>
        );
        return(
            <React.Fragment>
                <ButtonGroup className="my-3">
                    {navButtons}
                </ButtonGroup>
                <Description value={this.props.active} />
            </React.Fragment>
        );
    }
    
}

function Description(props) {
    if (props.value === "FAIR")
        return (
            <Container>
                <Row>
                    <Col>
<h4>FAIR: Findable, Accessible, Interoperable and Reusable</h4>
<p>
This information in the table below assesses the collections according to the <a href="https://doi.org/10.1038/sdata.2016.18">FAIR Principles</a>.  
Please see the <a href="https://github.com/MathHubInfo/Documentation/wiki/Math-Databases#FAIR">FAIR section of the survey wiki</a> for descriptions of each of the principles.
Another good reference is <a href="https://www.go-fair.org/fair-principles/">GO FAIR</a>.</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm="8" md="9" lg="10">
<p>
FAIR readiness of a collection is represented by a table of colours for each of the four main principles: findable, accessible, interoperable and reusable.
Where the rows represent the sub-properties and the columns the readiness for metadata, dataset and each datum, in this order.  The possible values are: unknown (black), not considered (blank), mostly supported (green), somewhat supported (yellow) and mostly unsupported (red).
</p>
<p>The rows of each diagram correspond to the items in the principle: <b>F1</b>, <b>F2</b>, <b>F3</b>, <b>F4</b> for Findable; <b>A1</b>, <b>A1.1</b>, <b>A1.2</b>, <b>A2</b> for Accessible; <b>I1</b>, <b>I2</b>, <b>I3</b> for Interoperable and <b>R1</b>, <b>R1.1</b>, <b>R1.2</b>, <b>R1.3</b> for Reusable.</p>
<p>The three columns stand for the three layers.  <b>D</b> for dataset, <b>A</b> for datum and <b>M</b> for metadata.</p>
                    </Col>
                    <Col sm="4" md="3" lg="2">
<p>An example of a diagram for <b>F</b></p>
<table className="diagram diagram-legend">
    <tbody>
        <tr><th></th><th>D</th><th>A</th><th>M</th></tr>
        <tr><th>F1</th><td className="diagram-somewhat"></td><td className="diagram-false"></td><td className="diagram-true"></td></tr>
        <tr><th>F2</th><td className="diagram-blank"></td><td className="diagram-blank"></td><td className="diagram-somewhat"></td></tr>
        <tr><th>F3</th><td className="diagram-blank"></td><td className="diagram-blank"></td><td className="diagram-true"></td></tr>
        <tr><th>F4</th><td className="diagram-false"></td><td className="diagram-false"></td><td className="diagram-true"></td></tr><tr></tr>
    </tbody>
</table>
                    </Col>
                </Row>
            </Container>
        );
    else return null;
}