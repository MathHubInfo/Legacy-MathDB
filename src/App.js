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
      
        console.log(db);

        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: props => <CollectionName text={props.value.text} url={props.value.url} />
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
            Header: 'Author(s)',
            accessor: 'authors',
            Cell: props => <Authors data={props.value} />
        }, {
            Header: 'Irredundant?',
            accessor: 'irredundant',
            Cell: props => {boolString(props.value)}
        }]

        const data = db.collection.map((c) => {
            return {
                name: {text: c.name, url: c.url},
                published: c.published,
                object_type: c.object_type,
                authors: getAuthors(c.id),
                size: c.size,
                irredundant: c.irredundant
            }
        })

        return (
            <div className="App">
                <ReactTable data={data} columns={columns} />
            </div>
        );
    }
}

function CollectionName(props) {
    return <a href={props.url}>{props.text}</a>;
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
