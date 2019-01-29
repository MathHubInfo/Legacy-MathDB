import React, { Component } from 'react';

export default class Collection extends Component {
    
    render() {
        return(
            <React.Fragment>
                <a href={this.props.url}>{this.props.text}</a><br/>
                <Authors show={this.props.show} data={this.props.authors} />
            </React.Fragment>
        );
    }
    
}

function Author(props) {
    const fullname = props.data.name + " " + props.data.surname
    if (!(props.data.url === null)) return <a href={props.data.url} className="author text-muted">{fullname}</a>;
    else return <span className="author text-muted">{fullname}</span>
}

function Authors(props) {
    if ((typeof props.data !== 'undefined') && props.show) return(
        <React.Fragment>
            {props.data.map((a, i) => <React.Fragment key={i}>{!!i && ", "} <Author data={a} /></React.Fragment> )}
        </React.Fragment>
    );
    else return null;
}