import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './recordList.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBars, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EditModal from './edit';

export default function RecordList() {

  const url = "http://localhost:5000/record/";
  const [records, setRecords] = useState([]);

  // state for tracking dragging item (for styling)
  const [dragging, setDragging] = useState(false);

  // current dragging item
  const dragItem = useRef();
  // reference to specific node, for drag end
  const dragItemNode = useRef();

  // popup modals
  const [popUpModule, setPopUpModule] = useState(false);


  // start drag
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
    const driverIndex = findIndexByID(records, driverID, '_id')
    const itemIndex = findIndexByID(records[driverIndex].records, orderID, 'orderID');
    const dragdriverIndex = findIndexByID(records, dragItem.current.driverID, '_id')
    const dragitemIndex = findIndexByID(records[dragdriverIndex].records, dragItem.current.orderID, 'orderID');
    // const currentItem = dragItem.current;
    if (dragItemNode.current !== e.target) {

      setRecords(oldRecords => {
        let newRecords = JSON.parse(JSON.stringify(oldRecords)); // creates deep copy of records instead of shallow ... destructuring copy
        newRecords[driverIndex].records.splice(itemIndex, 0, newRecords[dragdriverIndex].records.splice(dragitemIndex,1)[0]);

        dragItem.current = {driverID, orderID};
        // updateRecords();
        return newRecords;
      })
     }
  };

  const findIndexByID = (array, id, idKey) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i][idKey] === id) {
        return i;
      }
    }
  }

  const handleDragEnd = (e) => {
    console.log('drag ending...')
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener('dragend', handleDragEnd)
    dragItemNode.current = null;
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
  const updateData = useEffect(() => {
    axios.get(url).then(res => {
      setRecords(res.data);
    })
  }, [])

  // This method will delete a record based on the method
  function deleteRecord(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      // console.log(response.data);
      setRecords(response.data);
    updateData();
    });
  }

  // NOT WORKING -- this method will update the database
  // function updateRecords(){
  //   records.forEach(record => {
  //     axios.post('https://localhost:5000/update/' + record._id, record, {
  //     }).then(res => {
  //       console.log('updates database');
  //     })
  //   })
  // }

  const preventDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  // this method will map out the rows of each table
  const Record = (currentrecord) => (
    <tr 
      draggable 
      onDragStart={(e) => {handleDragStart(e, currentrecord.driverID, currentrecord.record.orderID)}}
      onDragEnter={dragging?(e) => {handleDragEnter(e, currentrecord.driverID, currentrecord.record.orderID)}:null}
      key={currentrecord.record.orderID} 
      className={dragging?getStyles(currentrecord.driverID, currentrecord.record.orderID):"active-row"}>
      <td><FontAwesomeIcon icon={faBars}/></td>
      <td onDragEnter={(e) => { preventDrag(e)}}>{currentrecord.record.description}</td>
      <td onDragEnter={(e) => { preventDrag(e)}}className="revenue">{currentrecord.record.revenue}</td>
      <td onDragEnter={(e) => { preventDrag(e)}}className="cost">{currentrecord.record.cost}</td>
      <td onDragEnter={(e) => { preventDrag(e)}}className="actionButtons"> 
      <button onClick={() => setPopUpModule(currentrecord.record.orderID)} className="tableButton">
          <FontAwesomeIcon icon={faEdit}/>
        </button>
      <button onClick={() => setPopUpModule(currentrecord.record.orderID)} className="tableButton">
        <FontAwesomeIcon icon={faTrashAlt}/></button>
      </td>
    </tr>
  ); 

  // this method will map out the unassigned records on the table
  function unassignedList() {
    // console.log('records', records)
    const unassignedRecords = records.filter(record => record.driver === 'unassigned');
    if (unassignedRecords.length > 0) {
      return unassignedRecords[0]['records'].map((currentrecord) => { 
        return (
          <>
          <Record
          record={currentrecord}
          deleteRecord={deleteRecord}
          key={currentrecord.orderID}
          driverID={unassignedRecords[0]['_id']}
          />
          <popUpModule
          description={currentrecord.description}
          revenue={currentrecord.revenue}
          cost={currentrecord.cost}
          orderId={currentrecord.orderID}
          trigger={(popUpModule === currentrecord.orderID)? true : false}
          setRecords={setRecords}
          setTrigger={setPopUpModule}
        />
        </>
       );
        })
    } else return null;
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
                deleteRecord={deleteRecord}
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
            <thead>
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

