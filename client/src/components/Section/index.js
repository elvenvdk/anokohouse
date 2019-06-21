import React from 'react';

const section = ({ sectionId, sectionClassName, children, title }) => (
  <div className={`Section__${sectionClassName}`} id={sectionId}>
    {title && <h3 className={`Section__${sectionClassName}-Title`}>{title}</h3>}
    {children}
  </div>
);

export default section;
