import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

export default class References extends Component {
    
    render() {
        if (typeof this.props.value === "undefined") return null;
        const refs = this.props.value.map((item) => (<Reference key={item.id} reference={item.id} value={item.reference} />));
        return(
            <React.Fragment>
                {refs}
            </React.Fragment>
        );
    }
    
}

class Reference extends Component {
                                          
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { tooltipOpen: false };
    }
    
    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }

    render() {
        var icon = "icon-sphere";
        var url = this.props.value;
        var arr = this.props.value.split(":")
        var tooltip = "Website";
        if (arr[0] === "doi") {
            icon = "icon-doi";
            url = "https://doi.org/" + arr[1];
            tooltip = "DOI: Digital Object Identifier";
        }
        if (arr[0] === "rg") {
            icon = "icon-researchgate";
            url = "https://www.researchgate.net/publication/" + arr[1];
            tooltip = "ResearchGate";
        }
        if (arr[0] === "arxiv") {
            icon = "icon-arxiv";
            url = "https://arxiv.org/abs/" + arr[1];
            tooltip = "Arxiv";
        }

        if (arr[0] === "ISBN") return(
            <span className="isbn">{this.props.value}</span>
        );
        else return (
            <React.Fragment>
                <a href={url} className="icn" id={"ref" + this.props.reference}><span className={icon}></span></a>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={"ref" + this.props.reference} toggle={this.toggle}>
                    {tooltip}
                </Tooltip>
            </React.Fragment>
        );
    }
}