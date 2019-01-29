import React from 'react';
import Collection from './Collection.js'
import HeaderWithTooltip from './HeaderWithTooltip.js'
import Publications from './Publications.js'
import db from './cmo.json';
import cols from './columns.json';

const boolString = (value) => {
    if (value === null) return "";
    else if (value > 0) return "yes";
    else return "no";
}

function getAuthors(collectionId) {
    
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

function tableData(columns) {
    
    const columnProps = {
        citable: {
            Cell: props => {boolString(props.value)}
        },
        comment: {
            Cell: props => <div>{props.value}</div>
        },
        irredundant: {
            Cell: props => {boolString(props.value)}
        },
        name: {
            Cell: props => <Collection show={columns === "general"} text={props.value.text} url={props.value.url} authors={props.value.authors} />
        }, 
        published: {
            Cell: props => <Publications value={props.value} />
        }
    }
    
    const c = cols[columns].map((key) => {
        var col = cols["data"][key];
        col["accessor"] = key;
        if (columnProps.hasOwnProperty(key)) {
            for (var p in columnProps[key]) {
                if (columnProps[key].hasOwnProperty(p)) col[p] = columnProps[key][p];
            }
        }
        if (col.hasOwnProperty("Description")) {
            var headerText = col["Header"];
            col["Header"] = () => (<HeaderWithTooltip id={key} text={headerText} tooltip={col["Description"]} />)
        }
        return col;
    });;
        
    const d = db.collection.map((c, i) => {
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
    
    return {
        columns: c,
        data: d
    };
    
}

export default tableData;