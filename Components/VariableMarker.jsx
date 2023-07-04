import React from 'react';

const VariableMarker = ({ value }) => {
  const states = [
    { id: 1, color: 'red' },
    { id: 2, color: 'orange' },
    { id: 3, color: 'yellow' },
    { id: 4, color: 'green' },
    { id: 5, color: 'blue' },
    { id: 6, color: 'purple' },
  ];

  return (
    <div className="flex">
      {states.map((state) => (
        <div
          key={state.id}
          className={`w-20 h-100 ${value >= state.id ? state.color : 'gray'} mr-5`}
        />
      ))}
    </div>
  );
};

export default VariableMarker;
