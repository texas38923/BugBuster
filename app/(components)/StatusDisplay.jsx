import React from 'react';

const StatusDisplay = ({ status }) => {
  const getColor = (status) => {
    let color = 'bg-slate-700';
    switch (status.toLowerCase()) {
      case 'done':
        color = 'bg-green-200';
      case 'started':
        color = 'bg-yellow-200';
      case 'not started':
        color = 'bg-red-200';
    }
    return color;
  };

  const getHoverColor = (status) => {
    let color = 'bg-slate-700';
    switch (status.toLowerCase()) {
      case 'done':
        color = 'bg-green-400';
      case 'started':
        color = 'bg-yellow-400';
      case 'not started':
        color = 'bg-red-400';
    }
    return color;
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status
      )} cursor-pointer`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
