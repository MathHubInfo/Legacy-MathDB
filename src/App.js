import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Button, ButtonGroup, Container } from 'reactstrap';
import './App.css';
import db from './cmo.json';
import cols from './columns.json';

const getAuthors = (collectionId) => {
    
    function compare(a, b) {
        const surnameA = a.surname.toUpperCase();
        const surnameB = b.surname.toUpperCase();
        let comparison = 0;
        if (surnameA > surnameB) {
            comparison = 1;
        } else if (surnameA < surnameB) {
            comparison = -1;
        }
        return comparison;
    }
    
    var authors = db.collection_author.filter((ca) => { 
        return ca.c_id === collectionId;
    }).map((ca) => {
        return db.author.filter((a) => { return a.id === ca.a_id; })[0]
    })
    authors = authors.sort(compare);
    return authors;
}

const boolString = (value) => {
    if (value === null) return "";
    else if (value > 0) return "yes";
    else return "no";
}

const makeColumns = (columnSet, computed) => {
    return cols[columnSet].map((key) => {
        var c = cols["data"][key];
        c["accessor"] = key;
        if (computed.hasOwnProperty(key)) {
            for (var p in computed[key]) {
                if (computed[key].hasOwnProperty(p)) c[p] = computed[key][p];
            }
        }
        return c;
    });
}

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

        const columnProps = {
            name: {
                Cell: props => <CollectionData text={props.value.text} url={props.value.url} authors={props.value.authors} />
            }, 
            published: {
                Cell: props => <Publication value={props.value} />
            },
            citable: {
                Cell: props => {boolString(props.value)}
            },
            irredundant: {
                Cell: props => {boolString(props.value)}
            }
        }
        
        const columns = makeColumns(this.state.columns, columnProps);
        
        const data = db.collection.map((c, i) => {
            return {
                index: i + 1,
                id: c.id,
                name: {text: c.name, url: c.url, authors: getAuthors(c.id)},
                published: c.published,
                object_type: c.object_type,
                size: c.size,
                citable: c.citable,
                irredundant: c.irredundant,
                collaborative: c.collaborative,
                decentralised: c.decentralised,
                interoperable: c.interoperable,
                searchable: c.searchable,
                selfexplaining: c.selfexplaining,
                comment: c.comment
            }
        })

        return (
            <Container className="App">
                <h1>Catalogue of Collections of Mathematical Objects</h1>
                <ButtonGroup className="my-3">
                    <Button size="sm"
                        onClick={() => this.toggleDisplay("general")} 
                        active={this.state.columns === "general"}>
                            General Information
                    </Button>
                    <Button size="sm"
                        onClick={() => this.toggleDisplay("properties")} 
                        active={this.state.columns === "properties"}>
                            Collection Properties
                    </Button>
                </ButtonGroup>
                <ReactTable
                    data={data}
                    columns={columns}
                    className={"-striped"}
                    sortable={true}
                />
            </Container>
        );
    }
}

function CollectionData(props) {
    return(
        <React.Fragment>
            <a href={props.url}>{props.text}</a><br/>
            <Authors data={props.authors} />
        </React.Fragment>
    );
}

function Authors(props) {
    if ((typeof props.data !== 'undefined')) return(
        <React.Fragment>
            {props.data.map((a, i) => <React.Fragment key={i}>{!!i && ", "} <Author data={a} /></React.Fragment> )}
        </React.Fragment>
    );
    else return null;
}

function Author(props) {
    const fullname = props.data.name + " " + props.data.surname
    if (!(props.data.url === null)) return <a href={props.data.url} className="author text-muted">{fullname}</a>;
    else return <span className="author text-muted">{fullname}</span>
}

function Publication(props) {
    if (props.value === null) return null;
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

export default App;