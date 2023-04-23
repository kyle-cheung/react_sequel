import React from 'react';

const History = ({ history }) => {
  return (
    <ul className="list-none p-5 mt-3 border font-manrope bg-slate-50 bg-opacity-80 rounded-md">
      {history.map((item, index) => (
        <li key={index} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default History;
