import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './recordList.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBars, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import EditModal from './edit';

export default function RecordList() {
  const url = "http://localhost:5000/record/";
  const [records, setRecords] = useState([]);

  // state for tracking dragging item (for styling)
  const [dragging, setDragging] = useState(false);

  // current dragging item
  const dragItem = useRef();
  // reference to specific node, for drag end
  const dragItemNode = useRef();

  const handleDragStart = (e, driverID, orderID) => {
    console.log('drag starting...', driverID, orderID)
    const params = {driverID, orderID}
    console.log('target', e.target)
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener('dragend', handleDragEnd)
    dragItem.current = params;

    setTimeout(() => {
      setDragging(true); 
    },0)  
  };

  const handleDragEnter = (e, driverID, orderID) => {
    console.log('entering drag...', driverID, orderID);
    const grpI = findIndexByID(records, driverID, '_id')
    const itemI = findIndexByID(records[grpI].records, orderID, 'orderID');
    const dragGrpI = findIndexByID(records, dragItem.current.driverID, '_id')
    const dragItemI = findIndexByID(records[dragGrpI].records, dragItem.current.orderID, 'orderID');
    if (dragItemNode.current !== e.target) {
      setRecords(oldRecords => {
        let newRecords = JSON.parse(JSON.stringify(oldRecords)); // creates deep copy of records instead of shallow ... destructuring copy

        newRecords[grpI].records.splice(itemI, 0, newRecords[dragGrpI].records.splice(dragItemI,1)[0]);

        dragItem.current = {driverID, orderID};
        return newRecords;
      })
     }
  };

  useEffect(() => {
    records.forEach((driver) => {
      axios
      .post('http://localhost:5000/update/' + driver._id, { records: driver.records })
      .then(res => {
        console.log(res);
      })
    })
  })

  const handleDragEnd = (e) => {
    console.log('drag ending...')
    setDragging(false);
      
    dragItem.current = null;
    dragItemNode.current.removeEventListener('dragend', handleDragEnd)
    dragItemNode.current = null;
  };

  const findIndexByID = (array, id, idKey) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i][idKey] === id) {
        return i;
      }
    }
  };

  const preventDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // assign style class to current dragging row
  const getStyles = (driverID, orderID) => {
    const currentItem = dragItem.current;
    if(currentItem.driverID === driverID && currentItem.orderID === orderID) {
      return 'active-row current'
    }
    return 'active-row';
  }

  // this method will get the data from the database.
 useEffect(() => {
    axios.get(url).then(res => {
      setRecords(res.data);
    })
  }, [])

  // This method will delete a record based on the method
  // function deleteRecord(driverID, orderID) {
  //   axios.delete("http://localhost:5000/" + driverID + '/' + orderID).then((response) => {
  //     setRecords(response.data);
  //     updateData();
  //   });
  // }

  // this method will map out the rows of each table
  const Record = (currentrecord) => (
    <tr 
      draggable 
      onDragStart={(e) => {handleDragStart(e, currentrecord.driverID, currentrecord.record.orderID)}}
      onDragEnter={dragging?(e) => {handleDragEnter(e, currentrecord.driverID, 0)}:null}
      key={currentrecord.record.orderID} 
      className={dragging?getStyles(currentrecord.driverID, currentrecord.record.orderID):"active-row"}>
      <td><FontAwesomeIcon icon={faBars}/></td>
      <td>{currentrecord.record.description}</td>
      <td className="revenue">&#36;&nbsp;{currentrecord.record.revenue}</td>
      <td className="cost">&#36;&nbsp;{currentrecord.record.cost}</td>
      <td className="actionButtons"> 
        <Link to={"/edit/" + currentrecord.driverID + '/' + currentrecord.record.orderID}
          ><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;
        <a
          href="/"
          onClick={() => {
            currentrecord.deleteRecord(currentrecord.driverID, currentrecord.record.orderID);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt}/>
        </a>
      </td>
    </tr>
  ); 

  // this method will map out the unassigned records on the table
  function unassignedList() {
    const unassignedRecords = records.filter(record => record.driver === 'unassigned');
    if (unassignedRecords.length > 0) {
      return unassignedRecords[0]['records'].map((currentrecord) => { 
        return (
          <Record
          record={currentrecord}
          // deleteRecord={deleteRecord}
          key={currentrecord.orderID}
          driverID={unassignedRecords[0]['_id']}
          />
          );
        })
    } return null;
  }

  // this method will map to create tables for all drivers (assignedList container)
  function createDriverTable(driver) {
    if (driver.records.length > 0) {
     return ( 
      <>
        <table className="content-table">
            <caption>Driver: {driver.driver}</caption>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Description</th>
                <th>Revenue</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {driver['records'].map((currentrecord) => { 
              return (
                <Record
                record={currentrecord}
                // deleteRecord={deleteRecord}
                key={currentrecord.orderID}
                driverID={driver._id}
                />
              );
            })}</tbody>
            <tfoot></tfoot>
        </table>
      </>)
    } else {
      return (
        <>
          <table className="content-table">
            <caption>Driver: {driver.driver}</caption>
            <thead onDragEnter={dragging?(e) => {handleDragEnter(e, driver._id, 0)}:null}>
                <tr>
                  <th>No assignments for this driver.</th>
                </tr>
            </thead>
            <tfoot></tfoot>
          </table>
        </>
      )
    }  
  }

  // this method will create sets for the assigned drivers to create their own tables
  function assignedList() {
    const assignedListTables = []
    const assignedRecords = records.filter(record => record.driver !== 'unassigned'); 
    for (let record of assignedRecords) {
      assignedListTables.push(createDriverTable(record))
    }
    return assignedListTables;
  }

  return (
    <>
      <div className="container">

        <div className="unAssignedRecordsContainer">
          <table className="content-table">
            <caption>Unassigned Orders</caption>
            <thead onDragEnter={dragging?(e) => {handleDragEnter(e, records[0]._id, 0)}:null}>
              <tr>
              <th>&nbsp;</th>
                <th>Description</th>
                <th>Revenue</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{unassignedList()}</tbody>
            <tfoot></tfoot>
          </table>
        </div>

        <div className="assignedRecords">
          {assignedList()} 
        </div>
      </div>
    </>
  
  )
}
