import React from 'react';
import './information.css';

// Information component
const Information = ({ item }) => {
  return (
    <div className="information">
      <h2>Machine Name: {item.MACHINE}</h2>
      <h4>
        From {item.DATETIME_FROM} to {item.DATETIME_TO}
      </h4>
      <p>The total net production for the machine {item.PRODUCTION}</p>
      <p>
        The percentage of scrap: {item.SCRAP_PERCENTAGE} % VS gross production:
        {item.PRODUCTION}
      </p>
      <p>The percentage of downtime for a machine : {item.DOWNTIME_PERCENTAGE} %</p>
    </div>
  );
};

export default Information;
