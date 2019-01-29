import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Button, ButtonGroup, Container } from 'reactstrap';
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
                <p>The FAIR readiness is assessed according to <a href="https://doi.org/10.1038/sdata.2016.18">FAIR Principles</a> on the dataset level.</p>
                <ButtonGroup className="my-3">
                    <Button size="sm"
                        onClick={() => this.toggleDisplay("general")} 
                        active={this.state.columns === "general"}>
                            General Information
                    </Button>
                    <Button size="sm"
                        onClick={() => this.toggleDisplay("FAIR")} 
                        active={this.state.columns === "FAIR"}>
                            FAIR Readiness
                    </Button>
                    <Button size="sm"
                        onClick={() => this.toggleDisplay("properties")} 
                        active={this.state.columns === "properties"}>
                            Collection Properties
                    </Button>
                </ButtonGroup>
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