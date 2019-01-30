import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const tabs = [
    {"id": "general", "label": "General Information"},
    {"id": "size", "label": "Size Information"},
    {"id": "FAIR", "label": "FAIR Readiness"},
    {"id": "properties", "label": "Collection Properties"}
];

export default class Navigation extends Component {
    
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
            <ButtonGroup className="my-3">
                {navButtons}
            </ButtonGroup>
        );
    }
    
}