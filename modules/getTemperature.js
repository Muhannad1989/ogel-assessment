// import module
const execute = require('./execQuery');

const execQuery = execute();

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

module.exports.getTemperature = getTemperature;
