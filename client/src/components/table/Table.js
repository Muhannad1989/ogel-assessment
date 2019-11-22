import React from 'react';
import './table.css';

const Table = ({ item }) => {
  // change object to array
  let result = Object.values(item);
  // production per hour
  result = result.slice(3, 27);

  return (
    <table>
      <tbody>
        <tr>
          <th colSpan="2"> Machine Name: {item.MACHINE}</th>
        </tr>
        <tr>
          <th>Hour</th>
          <th>Productions per hour</th>
        </tr>
        {result.map((product, index) => (
          <tr key={index}>
            <td>hour {index + 1}</td>
            <td>{product}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
