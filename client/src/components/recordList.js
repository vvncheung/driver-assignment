import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd' 
import './recordList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Record = (currentrecord) => (
  <tr>
    <td>{currentrecord.record.description}</td>
    <td className="revenue">{currentrecord.record.revenue}</td>
    <td className="cost">{currentrecord.record.cost}</td>
    <td className="actionButtons">
      <Link to={"/edit/" + currentrecord.record._id}><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;
      <a
        href="/"
        onClick={() => {
          currentrecord.deleteRecord(currentrecord.record._id);
        }}
      >
        <FontAwesomeIcon icon={faTrashAlt}/>
      </a>
    </td>
  </tr>
); 

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
    const unassignedRecords = records.filter(record => record.driver === 'null');
    return unassignedRecords.map((currentrecord) => { 
      return (
        <Record
        record={currentrecord}
        deleteRecord={deleteRecord}
        key={currentrecord._id}
        />
        );
    })
  }

  function createRecordsTable(array) {
     return ( 
      <><h3>Driver: {array[0].driver}</h3>
          <table className="content-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Revenue</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
          <tbody>{
          array.map((currentrecord) => { 
            return (
          <Record
          record={currentrecord}
          deleteRecord={deleteRecord}
          key={currentrecord._id}
          />
          );
        })}</tbody>
        </table></>)
    
  }

  // driverRecords = {
  //   laurence: [{ ... }, { ... }],
  //   vivian: [{ ... }],``
  // }
  // This method will create sets for the assigned records on their own tables
  function assignedList() {
    const assignedListTables = [];
    const driverRecords = {};
    const assignedRecords = records.filter(record => record.driver !== 'null'); //create array of orders where drivers !== 'null'
    assignedRecords.forEach(record => {
      if(driverRecords[record.driver]) { // if driver exists
        driverRecords[record.driver].push(record); // push record to driver key
      }
      else {
        driverRecords[record.driver] = []; // driver does not exist -> create driver key and empty value
        driverRecords[record.driver].push(record); // push dat
      }
    });

    let driverRecordsKeys = Object.keys(driverRecords) // creates array of keys from driverRecords
    for (let driver of driverRecordsKeys) {
      assignedListTables.push(createRecordsTable(driverRecords[driver]));
    }
    return assignedListTables;
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
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

// legacy code
// const Record = (props) => (
//   <tr>
//     <td>{props.record.description}</td>
//     <td className="revenue">{props.record.revenue}</td>
//     <td className="cost">{props.record.cost}</td>
//     <td className="actionButtons">
//       <Link to={"/edit/" + props.record._id}><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;
//       <a
//         href="/"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         <FontAwesomeIcon icon={faTrashAlt}/>
//       </a>
//     </td>
//   </tr>
// );

// export default class RecordList extends Component {
//   // This is the constructor that shall store our data retrieved from the database
//   constructor(props) {
//     super(props);
//     this.deleteRecord = this.deleteRecord.bind(this);
//     this.state = { records: [] };
//   }

//   // This method will get the data from the database.
//   componentDidMount() {
//     axios
//       .get("http://localhost:5000/record/")
//       .then((response) => {
//         this.setState({ records: response.data });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }


//   // This method will delete a record based on the method
//   deleteRecord(id) {
//     axios
//       .delete("http://localhost:5000/" + id).then((response) => {
//       console.log(response.data);
//     });

//     this.setState({
//       record: this.state.records.filter((el) => el._id !== id),
//     });
//   }

//   // This method will map out the users on the table
//   recordList() {
//     return this.state.records.map((currentrecord) => {
//       return (
//         <Record
//           record={currentrecord}
//           deleteRecord={this.deleteRecord}
//           key={currentrecord._id}
//         />
//       );
//     });
//   }

//   // This following section will display the table with the records of individuals.
//   render() {
//     return (
//       <div className="container">

//         <div className="unAssignedRecordsContainer">
//           <h3>Unassigned Orders</h3>
//           <table className="content-table">
//             <thead>
//               <tr>
//                 <th>Description</th>
//                 <th>Revenue</th>
//                 <th>Cost</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>{this.recordList()}</tbody>
//           </table>
//         </div>

//         <div className="assignedRecordsContainer">

//           <div className="assignedRecords">
//             <h3>Driver: Name</h3>
//             <table className="content-table" >
//               <thead>
//                 <tr>
//                   <th>Description</th>
//                   <th>Revenue</th>
//                   <th>Cost</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>{this.recordList()}</tbody>
//             </table>
//           </div>

//         </div>
//       </div>
//     );
//   }
// }