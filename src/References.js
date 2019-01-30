import React, { Component } from 'react';

export default class References extends Component {
    
    render() {
        if (typeof this.props.value === "undefined") return null;
        const refs = this.props.value.map((item) => (<Reference key={item.id} value={item.reference} />));
        return(
            <React.Fragment>
                {refs}
            </React.Fragment>
        );
    }
    
}

function Reference(props) {
    var icon = "icon-sphere";
    var url = props.value;
    var arr = props.value.split(":")
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

    if (arr[0] === "ISBN") return <span className="isbn">{props.value}</span>;
    else return <a href={url} className="icn"><span className={icon}></span></a>;
}