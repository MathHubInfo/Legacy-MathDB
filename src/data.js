import React from 'react';
import Collection from './Collection.js';
import HeaderWithTooltip from './HeaderWithTooltip.js';
import References from './References.js';
import db from './cmo.json';
import cols from './columns.json';
import FAIR from './FAIR.json';

const boolString = (value) => {
    if (value === null) return "";
    else if (value > 0) return "yes";
    else return "no";
}

const groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const copy = (from, to, fields) => {
    for (var j = 0; j < fields.length; j++) {
         var key = fields[j];
        to[key] = from[key];
    }
}

const copyToBlank = (from, fields) => {
    var o = {};
    copy(from, o, fields);
    return o;
}

const unmodifiedFields = [
    "comment",
    "object_type",
    "number_of_objects", "number_of_datasets", "number_of_contributors", "size", "time_to_generate",
    "provenance", "complete", "irredundant", "collaborative",  "decentralised", "interoperable", "searchable", "selfexplaining",
    //"F1", "F2", "F3", "F4", "FD", "A1", "A2", "AD", "I1", "I2", "I3", "R1", "R2", "R3", 
    "FAIR_summary"
]

const refs = groupBy(db.reference, 'c_id');
const auth = groupBy(db.collection_author, 'c_id');

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
    
    const a = auth[collectionId]
    if (typeof a === "undefined") return [];
    var authors = a.map((ca) => db.author.filter((a) => { return a.id === ca.a_id; })[0])
    authors = authors.sort(compare);
    return authors;
}

function tableData(columns) {
    
    const columnProps = {
        citable: {
            Cell: props => {boolString(props.value)}
        },
        irredundant: {
            Cell: props => {boolString(props.value)}
        },
        name: {
            Cell: props => <Collection show={columns === "general"} text={props.value.text} url={props.value.url} authors={props.value.authors} />
        },
        number_of_objects: {
            Cell: props => {
                if (props.value === null) return null;
                else return <span>{props.value.toLocaleString()}</span>
            }
        }, 
        references: {
            Cell: props => <References value={props.value} />
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
        var o = {
            index: i + 1,
            id: c.id,
            name: {text: c.name, url: c.url, authors: getAuthors(c.id)},
            references: refs[c.id],
            findable: copyToBlank(c, FAIR.F),
            accessible: copyToBlank(c, FAIR.A),
            interoperable: copyToBlank(c, FAIR.I),
            reusable: copyToBlank(c, FAIR.R)
        };
        console.log(o);
        copy(c, o, unmodifiedFields);
        return o;
    })
    
    return {
        columns: c,
        data: d
    };
    
}

export default tableData;