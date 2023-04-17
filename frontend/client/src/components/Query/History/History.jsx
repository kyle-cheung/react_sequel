import React from 'react';

const History = ({ history }) => {
  return (
    <ul className="list-none p-5 mt-5 mx-40 border">
      {history.map((item, index) => (
        <li key={index} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default History;
