import React, { Component } from 'react';
import ReactTable from 'react-table';
import './App.css';
import db from './cmo.json';

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

class App extends Component {
    
    render() {

        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: props => <CollectionData text={props.value.text} url={props.value.url} authors={props.value.authors} />
        }, {
            Header: 'Published?',
            accessor: 'published'
        }, {
            Header: 'Type of objects',
            accessor: 'object_type'
        }, {
            Header: '# of objects',
            accessor: 'size'
        }, {
            Header: 'Citable?',
            accessor: 'citable',
            Cell: props => {boolString(props.value)}
        }, {
            Header: 'Irredundant?',
            accessor: 'irredundant',
            Cell: props => {boolString(props.value)}
        }, {
            Header: 'Collaborative',
            accessor: 'collaborative'
        }, {
            Header: 'Decentralised',
            accessor: 'decentralised'
        }, {
            Header: 'Interoperable',
            accessor: 'interoperable'
        }, {
            Header: 'Searchable',
            accessor: 'searchable'
        }, {
            Header: 'Self-explaining',
            accessor: 'selfexplaining'
        }, {
            Header: 'Comment',
            accessor: 'comment'
        }]
        
        const data = db.collection.map((c) => {
            return {
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
            <div className="App">
                <ReactTable data={data} columns={columns} className={"-striped"} />
            </div>
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
    if (!(props.data.url === null)) return <a href={props.data.url}>{fullname}</a>;
    else return <span>{fullname}</span>
}

export default App;
