import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Row, Col } from 'reactstrap';
import LegendCell from './LegendCell.js';

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
                        <p>The FAIR readiness is assessed according to <a href="https://doi.org/10.1038/sdata.2016.18">FAIR Principles</a>. For a helpful reference, see <a href="https://www.go-fair.org/fair-principles/">GO FAIR</a>. FAIR readiness for each of the properties is represented by a table of colours, where the rows represent the sub-properties and the columns the readiness for metadata, dataset and each datum, in this order.  The possible values are: unknown (black), not considered (blank), mostly supported (green) and mostly unsupported (red).</p>
                    </Col>
                    <Col>
                        <table className="diagram-legend">
                            <tbody>
                                <tr>
                                    <th>F</th><th>A</th><th>I</th><th className="brd">R</th>
                                    <th>metadata</th><th>dataset</th><th>datum</th>
                                </tr>
                                <tr>
                                    <LegendCell value="F1" />
                                    <LegendCell value="A1" />
                                    <LegendCell value="I1" />
                                    <LegendCell value="R1" cls="brd" />
                                    <td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <LegendCell value="F2" />
                                    <LegendCell value="A11" />
                                    <LegendCell value="I2" />
                                    <LegendCell value="R11" cls="brd" />
                                    <td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <LegendCell value="F3" />
                                    <LegendCell value="A12" />
                                    <LegendCell value="I3" />
                                    <LegendCell value="R12" cls="brd" />
                                    <td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <LegendCell value="F4" />
                                    <LegendCell value="A2" />
                                    <td className="lrow"></td>
                                    <LegendCell value="R13" cls="brd" />
                                    <td></td><td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        );
    else return null;
}