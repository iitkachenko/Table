import React, { useState } from 'react';
import THead from './THead';

const PopUp = ({ row, saveRow, removeRow, closePopUp, columns }) => {
    const [values, setValues] = React.useState(row);
    const [isSaved, setIsSaved] = useState(true);
    
    const update = (e, attribute) => {
        setValues((prevValues) => (
            {...prevValues, [attribute]: e.target.value}
        ));
    }

    const handleChange = (e, attribute) => {
        setIsSaved(false);
        update(e, attribute);
    }

    const save = (values) => {
        saveRow(values);
        setIsSaved(true);
    }

    const inputElements = columns.map(({ attribute, isVisible }, index) => (
        isVisible ? <td key={index}>
                        <input type="text" value={values[attribute]} onChange={(e) => handleChange(e, attribute)} />
                    </td>
                  : ''
    ))
    return (
        <div className="popup-wrapper" onClick={closePopUp}>
            <div className="popup" onClick={e => e.stopPropagation()}>
                <button onClick={closePopUp} className="btn btn-close">X</button>
                <table className="popup-table">
                    <THead columns={columns}  canSort={false} />
                    <tbody>
                        <tr>{inputElements}</tr>
                    </tbody>
                </table>
                <div className="btn-group">
                    <button
                        onClick={() => save(values)}
                        className="btn btn-save"
                        disabled={isSaved}
                    >
                        Save
                    </button>
                    <button onClick={() => removeRow(values)} className="btn btn-remove">Remove</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp