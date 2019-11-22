// import module
const execute = require('./execQuery');

const execQuery = execute();

// get all scrap from database
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

module.exports.getScrap = getScrap;
