import React from 'react';

const Row = ({ data, columns, showPopUp }) => {
    const tdElements = columns.map(({ attribute, isVisible }, index) => (
        isVisible ? <td key={index}>{data[attribute]}</td> : ''
    ));
    
    return (
        <tr onClick={() => showPopUp(data)}>
            {tdElements}
        </tr>
    )
}

export default Row;