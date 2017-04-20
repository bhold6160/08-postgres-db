'use strict'

const express = require('express');
const fs = require('fs'); // allows us to use javascript to interact with the command line
const bodyParser = require('body-parser');
const pg = require('pg'); // will allow us to interact with postgresSQL

const app = express();
const PORT = process.env.PORT || 3000;

// set-up the URL to database we want to use
const connectionURL = 'postgres://localhost:5432/day8-assignmentdb';

const client = new pg.Client(connectionURL);
client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/new', function (request, response) {
  response.sendFile('new.html', { root: './public' });
});

app.get('/articles', function (request, response) {
  client.query('SELECT * FROM articles;')
  .then(function (tableData) {
    response.send(tableData.rows);
  });
});

app.listen(PORT, function () {
  console.log(`Our server is running on port ${PORT}`);
});
