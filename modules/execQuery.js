const express = require('express');
const util = require('util');
const mysql = require('mysql');
const app = express();

// const { execQuery } = require('./functions');

app.use(express.json());
const databaseName = 'db';

function execute() {
  // database connection settings

  // change the 'password' and 'user' when you test the routs
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: databaseName,
  });

  // connect to database
  connection.connect(err => {
    if (err) throw err;
    console.log(`You are connected to ${databaseName} database`);
  });

  return util.promisify(connection.query.bind(connection));
}

module.exports.execute = execute;
