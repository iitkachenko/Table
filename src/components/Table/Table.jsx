import React, {useState, useEffect} from 'react';
import { v4 as uuid } from 'uuid';
import DataRequest from '../../services/DataRequest';
import './Table.css';
import Row from './Row';
import THead from './THead';
import PopUpEdit from './PopUp';

const Table = ({ tableName, columns }) => {
  const [table, setTable] = useState([]);
  const [popUpEditIsShown, setPopUpEditIsShown] = useState(false);
  const [popUpEditRow, setPopUpEditRow] = useState({});
  const [isSaved, setIsSaved] = useState(true);
  const [sortedBy, setSortedBy] = useState({ attribute: '', direction: 'asc' });

  useEffect(() => {
    setTable(DataRequest.getData(tableName));
  }, []);

  const rowManipulation = {
    saveRow: (updatedRow) => {
      setTable(prevTable => (
        prevTable.map(row => (
          row.rowId === updatedRow.rowId ? updatedRow : row
        ))
      ));
      setIsSaved(false);
    },
    removeRow: (rowToRemove) => {
      setTable(prevTable => (
        prevTable.filter(row => (
          row.rowId !== rowToRemove.rowId
        ))
      ));
      setIsSaved(false);
      popUpManipulation.closePopUp();
    },
    addRow: () => {
      const newRow = columns.reduce((acc, {attribute}) => (
        {...acc,
          [attribute]: ''
        }
      ), {rowId: uuid()});
      setTable( prevTable => ([...prevTable, newRow]));
      setIsSaved(false);
      popUpManipulation.showPopUp(newRow);
    }
  }

  const popUpManipulation = {
    showPopUp: (row) => {
      setPopUpEditRow(row);
      setPopUpEditIsShown(true);
    },
    closePopUp: () => {
      setPopUpEditRow({});
      setPopUpEditIsShown(false);
    }
  }

  const saveTable = () => {
    DataRequest.saveData(tableName, table);
    setIsSaved(true);
  }

  const sortTable = (attr, type) => {
    const direction = checkDirection(sortedBy.attribute, attr, sortedBy.direction);

    function checkDirection(oldAttr, newAttr, direction) {
      if (oldAttr === '') return 'asc';
      if (newAttr !== oldAttr) return 'asc';
      return direction === 'asc' ? 'desc' : 'asc';
    }

    setTable(prevTable => [...prevTable].sort((a, b) => {
      if (direction === 'desc') {
        [a, b] = [b, a];
      }

      switch (type) {
        case 'string':
          {
            const A = a[attr].toLowerCase(), B = b[attr].toLowerCase();
            return A > B ? 1 : A === B ? 0 : -1;
          }
        default:
          return a[attr] - b[attr];
      }    
    }));

    setSortedBy(({attribute, direction}) => (
      {
        attribute: attr,
        direction: checkDirection(attribute, attr, direction)
      }
    ));
  }

  const rows = table.map((row, index) => (
      <Row
        key={index}
        data={row}
        columns={columns}
        showPopUp={popUpManipulation.showPopUp}
      />
  ));
  
  return (
    <div className='app-table'>
      <table>
        <THead columns={columns} sortTable={sortTable} />
        <tbody>
          {rows}
        </tbody>
      </table>
      <div className="btn-group">
        <button onClick={rowManipulation.addRow} className='btn btn-add'>Add Row</button>
        <button onClick={saveTable} disabled={isSaved} className='btn btn-confirm'>Confirm Changes</button>
      </div>
      {popUpEditIsShown &&
        <PopUpEdit
          row={popUpEditRow}
          {...rowManipulation}
          {...popUpManipulation}
          columns={columns}
        />}
    </div>
  )
}

export default Table;