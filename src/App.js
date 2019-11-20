import React, { Component } from 'react';

/////////// Assignment B //////////////
// incase there is no temperature from fetching api
// indicate temperature color
const temperature = 50;
let color = 'green';

// time per mints
let time = 17;

// conditions
if (temperature > 85 || (temperature <= 100 && time > 15)) {
  color = 'orange';
} else if (temperature > 100 || (temperature > 85 && time > 15)) {
  color = 'red';
} else {
  color = 'green';
}
console.log(color);

/////////// Assignment A //////////////

// machine component
const Machine = ({ item }) => {
  return (
    <div className="machine">
      <h2>Machine Name: {item.MACHINE}</h2>
      <h4>
        From {item.DATETIME_FROM} to {item.DATETIME_TO}
      </h4>
      <p>The total net production for the machine - minus scrap {item.PRODUCTION}</p>
      <p>
        The percentage of scrap: {item.SCRAP_PERCENTAGE} VS gross production: {item.PRODUCTION}
      </p>
      <p>The percentage of downtime for a machine : {item.DOWNTIME_PERCENTAGE}</p>
    </div>
  );
};

const Table = ({ hours }) => {
  const result = Object.values(hours);
  return (
    <React.Fragment>
      <h3>Machine number</h3>
      {result.map((e, index) => (
        <tr key={index}>
          <td>hours {index + 1}</td>
          <td>{e}</td>
        </tr>
      ))}
    </React.Fragment>
  );
};

class Machines extends Component {
  // saving data in state
  state = {
    allMachines: [],
  };

  // get data function from api
  getData = () => {
    const api = 'https://www.marviq.com/assessment/index.php?page=a&from=2018-01-07%2000:00:00';
    const database = '';
    this.setState({ loading: true });
    fetch(api)
      .then(response => response.json())
      .then(machines => this.setState({ allMachines: machines, loading: false }))
      .catch(err => {
        this.setState({ error: true, loading: false });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="get-data">
          <button onClick={this.getData}>Get Users</button>
        </div>
        <div className="message">
          {/* display message in case there is still no data comes yet from database or api */}
          {this.state.allMachines.length === 0 ? (
            // message as loading data
            <div className="no-data">there is no data ...</div>
          ) : (
            // Machine information
            <div>
              <div className="machines">
                {this.state.allMachines.map((item, index) => {
                  return <Machine key={index} item={item} />;
                })}
              </div>
              <div className="table">
                <table>
                  <tr>
                    <th>Hours</th>
                    <th>Productions</th>
                  </tr>
                  {/* <h2>Table</h2>; */}
                  {this.state.allMachines.map((item, index) => {
                    return <Table key={index} hours={item} />;
                  })}
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Machines;
