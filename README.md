

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Database

The database is `sqlite3`.

*Import*: `cmoDb/cmo.db.sql` and save as `cmoDb/cmo.db`.

*Install* packages: `npm i sqlite3 sqlite-to-json` ([sqlite3](https://www.npmjs.com/package/sqlite3), [sqlite-to-json](https://www.npmjs.com/package/sqlite-to-json)).

*Export to JSON*: run `node sqlite-to-json.js` in `cmoDb`.

### Updating icons

1. Overwrite `public/icons.css` with `icons/style.css`.
2. Overwrite `public/fonts` with `icons/fonts`.
