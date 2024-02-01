import React from 'react';

const Tooltip = ({ tooltip, children }) => {
  return (
    <div className="relative inline-block group overflow-visible">
      {children}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-full left-1/2 transform -translate-x-1/2 bg-primary-950 text-primary-100 py-1 p-3 rounded shadow-lg text-base font-khorla tracking-wider mb-2 text-center whitespace-nowrap border">
        {tooltip}
      </div>
    </div>
  );
};

export default Tooltip;
