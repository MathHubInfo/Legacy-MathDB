import React, { Component } from 'react';
import ReactTable from 'react-table';
import './App.css';
import db from './cmo.json';

const getAuthors = (collectionId) => {
    return db.collection_author.filter((ca) => { 
        return ca.c_id === collectionId;
    }).map((ca) => {
        return db.author.filter((a) => { return a.id === ca.a_id; })[0]
    })
}

class App extends Component {
    
    render() {
      
        console.log(db);

        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: props => <CollectionName text={props.value.text} url={props.value.url} />
        }, {
            Header: '# of objects',
            accessor: 'size'
        }, {
            Header: 'Author(s)',
            accessor: 'authors',
            Cell: props => <Authors data={props.value} />
        }]

        const data = db.collection.map((c) => {
            return {
                name: {text: c.name, url: c.url},
                authors: getAuthors(c.id),
                size: c.size
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
   return <span>a</span> 
}

export default App;
