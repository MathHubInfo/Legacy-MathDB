import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Container } from 'reactstrap';
import Navigation from './Navigation.js';
import './App.css';
import tableData from './data.js';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = { columns: "general" };
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }
    
    toggleDisplay(selected) {
        this.setState({ columns: selected });
    }
    
    render() {
        const tb = tableData(this.state.columns)
        
        return (
            <Container className="App">
                <h1>Catalogue of Mathematical Datasets</h1>
                <p>See the <a href="https://github.com/MathHubInfo/Documentation/wiki/Math-Databases">wiki</a> for the non-tabulated contents of this catalogue.</p>
                <p>The FAIR readiness is assessed according to <a href="https://doi.org/10.1038/sdata.2016.18">FAIR Principles</a>. For a helpful reference, see <a href="https://www.go-fair.org/fair-principles/">GO FAIR</a>. FAIR readiness for each of the properties is represented by a table of colours, where the rows represent the sub-properties and the columns the readiness for metadata, dataset and each datum, in this order.  The possible values are: unknown (black), not considered (blank), mostly supported (green) and mostly unsupported (red).</p>
                <table className="diagram-legend">
                    <tbody>
                        <tr><th>F</th><th>A</th><th>I</th><th>R</th><th>metadata</th><th>dataset</th><th>datum</th></tr>
                        <tr><td>F1</td><td>A1</td><td>I1</td><td>R1</td><td></td><td></td><td></td></tr>
                        <tr><td>F2</td><td>A1.1</td><td>I2</td><td>R1.1</td><td></td><td></td><td></td></tr>
                        <tr><td>F3</td><td>A1.2</td><td>I3</td><td>R1.2</td><td></td><td></td><td></td></tr>
                        <tr><td>F4</td><td>A2</td><td></td><td>R1.3</td><td></td><td></td><td></td></tr>
                    </tbody>
                </table>
                <Navigation active={this.state.columns} toggleDisplay={(c) => this.toggleDisplay(c)} />
                <ReactTable
                    data={tb.data}
                    columns={tb.columns}
                    className={"-striped"}
                    sortable={true}
                />
            </Container>
        );
    }
}



export default App;