import React from 'react'

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="hidden group-hover:block bg-black text-white text-xs rounded p-1 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
