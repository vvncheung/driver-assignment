import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './recordList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Record = (props) => (
  <tr>
    <td>{props.record.description}</td>
    <td className="revenue">{props.record.revenue}</td>
    <td className="cost">{props.record.cost}</td>
    <td className="actionButtons">
      <Link to={"/edit/" + props.record._id}><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;
      <a
        href="/"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        <FontAwesomeIcon icon={faTrashAlt}/>
      </a>
    </td>
  </tr>
);

// export default function RecordList(props) {


//   return {

//   }
// }

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div className="container">

        <div className="unAssignedRecordsContainer">
          <h3>Unassigned Orders</h3>
          <table className="content-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Revenue</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.recordList()}</tbody>
          </table>
        </div>

        <div className="assignedRecordsContainer">

          <div className="assignedRecords">
            <h3>Driver: Name</h3>
            <table className="content-table" >
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Revenue</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.recordList()}</tbody>
            </table>
          </div>


          <div className="assignedRecords">
            <h3>Driver: Name</h3>
            <table className="content-table" >
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Revenue</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.recordList()}</tbody>
            </table>
          </div>

          <div className="assignedRecords">
            <h3>Driver Name</h3>
            <table className="content-table" >
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Revenue</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.recordList()}</tbody>
            </table>
          </div>

        </div>
      </div>

      
      
    );
  }
}