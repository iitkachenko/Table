import React from 'react';

const THead = ({ columns, sortTable, canSort = true }) => {
    const thElements = columns.map(({ title, attribute, type, isVisible }, index) => (
        isVisible ? <th key={index} onClick={canSort ? () => sortTable(attribute, type) : undefined}>{title}</th> : ''
    ));

  return (
    <thead>
        <tr>
            {thElements}
        </tr>
    </thead>
  )
}

export default THead;