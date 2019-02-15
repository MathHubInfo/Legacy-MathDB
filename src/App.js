import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Container, Row, Col } from 'reactstrap';
import Tabs from './Tabs.js';
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
                <Row>
                    <Col>
                        <h1>Catalogue of Mathematical Datasets</h1>
                        <p>See the <a href="https://github.com/MathHubInfo/Documentation/wiki/Math-Databases">wiki</a> for the non-tabulated contents of this catalogue.</p>

                        <Tabs active={this.state.columns} toggleDisplay={(c) => this.toggleDisplay(c)} />

                        <ReactTable
                            data={tb.data}
                            columns={tb.columns}
                            className={"-striped"}
                            sortable={true}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}



export default App;