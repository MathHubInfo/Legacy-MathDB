import React, { Component } from 'react';

export default class Publications extends Component {
    
    render() {
        if (this.props.value === null) return null;
        var icon = "icon-sphere";
        var url = this.props.value;
        var arr = this.props.value.split(":")
        if (arr[0] === "doi") {
            icon = "icon-doi";
            url = "https://doi.org/" + arr[1];
        }
        if (arr[0] === "rg") {
            icon = "icon-researchgate";
            url = "https://www.researchgate.net/publication/" + arr[1];
        }
        if (arr[0] === "arxiv") {
            icon = "icon-arxiv";
            url = "https://arxiv.org/abs/" + arr[1];
        }

        if (arr[0] === "ISBN") return <span className="isbn">{this.props.value}</span>;
        else return <a href={url} className="icn"><span className={icon}></span></a>;
    }
    
}