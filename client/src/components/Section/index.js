import React from 'react';

const section = ({ sectionId, sectionClassName, children }) => {
  return (
    <div className={`Section__${sectionClassName}`} id={sectionId}>
      {children}
    </div>
  );
};

export default section;
