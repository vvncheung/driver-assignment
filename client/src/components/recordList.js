import { useState, useEffect } from "react";
import axios from "axios";
import Record from './Record'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd' 
import './recordList.css';

export default function RecordList() {
  const url = "http://localhost:5000/record/";
  const [records, setRecords] = useState([]);

  // This method will get the data from the database.
  const updateData = useEffect(() => {
    axios.get(url).then(res => {
      setRecords(res.data);
    })
  }, [])

  // This method will delete a record based on the method
  function deleteRecord(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
      setRecords(response.data);
    updateData();
    });
  }

  // This method will map out the unassigned records on the table
  function unassignedList() {
    const unassignedRecords = records.filter(record => record.driver === 'unassigned');
    if (unassignedRecords.length > 0) {
      return unassignedRecords[0]['records'].map((currentrecord) => { 
        return (
          <Record
          record={currentrecord}
          deleteRecord={deleteRecord}
          key={currentrecord._id}
          />
          );
        })
    } return null;
  }

  // function createDriverHeader(record) {
  //   if (record.driver === "unassigned") {
  //     return (
  //       <h3>Unassigned Orders</h3>
  //     )
  //   }
  // }

  function createDriverTable(record) {
    if (record.records.length > 0) {
     return ( 
      <><h3>Driver: {record.driver}</h3>
          <table className="content-table">
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
          {record['records'].map((currentrecord) => { 
            return (
              <Record
              record={currentrecord}
              deleteRecord={deleteRecord}
              key={currentrecord._id}
              />
            );
          })}</tbody>
          </table></>)
    } else {
      return (
        <><h3>Driver: {record.driver}</h3>
          <table className="content-table">
            <thead>
                <tr>
                  <th>NO ASSIGNMENTS</th>
                  <td></td>
                </tr>
            </thead>
          </table>
        </>
      )
    }  
  }

  // This method will create sets for the assigned drivers to create their own tables
  function assignedList() {
    const assignedListTables = []
    const assignedRecords = records.filter(record => record.driver !== 'unassigned'); 
    for (let driver of assignedRecords) {
      assignedListTables.push(createDriverTable(driver))
    }
    return assignedListTables;
  }

  return (
    <>
      <div className="container">

        <div className="unAssignedRecordsContainer">
          <h3>Unassigned Orders</h3>
          <table className="content-table">
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
          </table>
        </div>

        <div className="assignedRecords">
          {assignedList()} 
        </div>
      </div>
    </>
  
  )
}