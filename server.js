// import modules
const express = require('express');
const util = require('util');
const mysql = require('mysql');
const app = express();

app.use(express.json());

// set database name in variable
const databaseName = 'db';

// 'Help function' will run with each route we use

function execute() {
  // database connection settings
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: databaseName,
  });
  //****** change the 'password' and 'user' when you test the routs **********/

  // connect to database
  connection.connect(err => {
    if (err) throw err;
    console.log(`You are connected to ${databaseName} database`);
  });

  return util.promisify(connection.query.bind(connection));
}

const execQuery = execute();

// end points //

// get any table by name
async function getTableByName(req, res) {
  try {
    await execQuery(`use ${databaseName}`);
    const selectedQuery = `select * from ${req.params.tableName}`;
    // we can use calculation inside query, like calculate a colum or etc.. ( SELECT COUNT(values) FROM production ; )
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

// get Scraps
async function getScrap(req, res) {
  try {
    await execQuery(`use ${databaseName}`);
    const selectedQuery = `select * from production where variable_name = 'scrap'`;
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

// get Productions
async function getProduction(req, res) {
  try {
    await execQuery(`use ${databaseName}`);
    const selectedQuery = `select * from production where variable_name = 'production'`;
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

// get Temperature
async function getTemperature(req, res) {
  try {
    await execQuery(`use ${databaseName}`);
    const selectedQuery = `select * from production where variable_name = 'core temperature'`;
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

///// our routes /////

// get all production
app.get('/production/total-production', getProduction);

// get all scrap
app.get('/production/total-scrap', getScrap);

// get all temperature
app.get('/production/temperature', getTemperature);

// get 'production' or 'runtime' tables
app.get('/:tableName', getTableByName);

// backend port
const port = 5000;

// listening to port
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

// you can test/use those routes with postman or try them in browser url
// Example:  http://localhost:5000/production and use it with out

// or //

// you can use them at the front end with out writhing 'http://localhost:5000/' ('it's already done with the settings')
// Example:  fetch('/production/temperature') or axios.get('/production/temperature')
