const express = require('express');
const util = require('util');
const mysql = require('mysql');
const app = express();

app.use(express.json());
const databaseName = 'db';

function execute() {
  // database connection settings
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: databaseName,
  });

  // connect to database
  connection.connect(err => {
    if (err) throw err;
    console.log('database is connected');
  });

  return util.promisify(connection.query.bind(connection));
}

// connect to database
const execQuery = execute();

// this will be call back function
async function getProduction(req, res) {
  try {
    await execQuery(`use ${databaseName}`);
    const selectedQuery = `select * from ${req.params.tableName} where variable_name = 'production'`;
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

async function getScrap(req, res) {
  try {
    await execQuery(`use ${databaseName}`);
    const selectedQuery = `select * from ${req.params.tableName} where variable_name = 'scrap'`;
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

async function getTemperature(req, res) {
  try {
    await execQuery(`use ${databaseName}`);
    const selectedQuery = `select * from ${req.params.tableName} where variable_name = 'core temperature'`;
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}
// select * from production where variable_name = 'production';
// select * from production where variable_name = 'scrap';
// select * from production where variable_name = 'CORE TEMPERATURE'

// route
// this route will be fetched in frontend side
// table name => Production & Runtime

// get all production
app.get('/:tableName/1', getProduction);

// get all production
app.get('/:tableName/2', getScrap);

// get all production
app.get('/:tableName/3', getTemperature);

const port = 5000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
