const execute = require('./execQuery');

const execQuery = execute();

async function getTableByName(req, res) {
  try {
    await execQuery(`use ${databaseName}`);
    const selectedQuery = `select * from ${req.params.tableName}`;
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

module.exports.getTableByName = getTableByName;
