import { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import './edit.css';
import './styles/button.css'

export default function EditModal(props) {

  const findIndexByID = (array, id) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]['orderID'] === id) {
        return i;
      }
    }
  }

  console.log('props',props)

  const [record, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);

  const {register, handleSubmit, formState: {errors}} = useForm();


    // This will get the record based on the id from the database.
    useEffect(() => {
      axios
        .get("http://localhost:5000/record/" + props.match.params.driverID)
        .then((response) => {
          console.log('response',response)

          let itemIndex = findIndexByID(response.data.records, props.match.params.orderID);
          console.log('itemIndex',itemIndex)

          setRecords({
            description: response.data.records[itemIndex].description,
            revenue: response.data.records[itemIndex].revenue,
            cost: response.data.records[itemIndex].cost
          });

          setAllRecords({
            arrayOfRecords: response.data.records
          });

          console.log('record',record)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [props, record])

    console.log('allrecords', allRecords)

    
  const onSubmit = (data) => {
    // console.log(data);
    const editedItem = {
      description: record.description,
      revenue: data.revenue,
      cost: data.cost,
      orderID: props.match.params.orderID
    }

    // replace edited data into driver's array of records
    const orderIdToUpdate = props.match.params.orderID;

    const getUpdatedArray = (allRecords, orderIdToUpdate) => {
      const newUpdatedArray = allRecords.arrayOfRecords;
      for (let i = 0; i < newUpdatedArray.length; i++) {
        if (newUpdatedArray[i].orderID === orderIdToUpdate) {
          newUpdatedArray[i] = editedItem;
        }
        console.log(newUpdatedArray)
      }
      return newUpdatedArray;
  };

    const updateDriverRecordsArray = getUpdatedArray(allRecords, orderIdToUpdate)

    axios
      .post('http://localhost:5000/update/' + props.match.params.driverID, { records: updateDriverRecordsArray })
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        window.location = "/";
      })
    };

   

return (
  <div className="modalContainer">
     <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="modalTitle">
          {record.description}
        </div>

        <div className="modalForm">

          <div className="inputDiv">
            <span className="errorMessage">{errors.revenue && "Please enter revenue to continue."}</span><br/>
            <span className="modalTextFieldHeaders">Revenue</span>&nbsp;&nbsp;
            <span className="numberSign">$</span><input className="modalTextFields" type="number" placeholder={record.revenue} name="revenue" {...register('revenue', { required: true })}/><br/>
          </div>

          <div className="inputDiv">
            <span className="errorMessage">{errors.cost && "Please enter cost to continue."}</span><br/>
            <span className="modalTextFieldHeaders">Cost</span> &nbsp;&nbsp;
            <span className="numberSign">$</span><input className="modalTextFields" type="number" placeholder={record.cost} name="cost" {...register('cost', { required: true })}/><br/>
          </div>

          </div>
            <button className="modalButton" type="submit">Add new record</button>
          </div>
    </form>
  </div> 
  );
};


// import axios from 'axios';
// import { withRouter } from "react-router";
// import './edit.css'

// // description: req.body.description, --> name
// // driver: req.body.driver, --> position
// // revenue: req.body.revenue, --> level
// // cost: req.body.cost,

// // description: req.body.description,
// // driver: req.body.driver,
// // revenue: req.body.revenue,
// // cost: req.body.cost,
 
// class Edit extends Component {
//   // This is the constructor that stores the data.
//   constructor(props) {
//     super(props);
 
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeRevenue = this.onChangeRevenue.bind(this);
//     this.onChangeCost = this.onChangeCost.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
 
//     this.state = {
//       description: "",
//       revenue: "",
//       cost: "",
//       records: [],
//     };
//   }
//   // This will get the record based on the id from the database.
//   componentDidMount() {
//     axios
//       .get("http://localhost:5000/record/" + this.props.match.params.id)
//       .then((response) => {
//         this.setState({
//           description: response.data.description,
//           driver: response.data.driver,
//           revenue: response.data.revenue,
//           cost: response.data.cost,
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
 
//   // These methods will update the state properties.
//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value,
//     });
//   }
 
//   onChangeDriver(e) {
//     this.setState({
//       driver: e.target.value,
//     });
//   }
 
//   onChangeRevenue(e) {
//     this.setState({
//       revenue: e.target.value,
//     });
//   }

//   onChangeCost(e) {
//     this.setState({
//       cost: e.target.value,
//     });
//   }
 
//   // This function will handle the submission.
//   onSubmit(e) {
//     e.preventDefault();
//     const newEditedDriver = {
//       description: this.state.description,
//       driver: this.state.driver,
//       revenue: this.state.revenue,
//       cost: this.state.cost,
//     };
//     console.log(newEditedDriver);
 
//     // This will send a post request to update the data in the database.
//     axios
//       .post(
//         "http://localhost:5000/update/" + this.props.match.params.id,
//         newEditedDriver
//       )
//       .then((res) => console.log(res.data));
 
//     this.props.history.push("/");
//   }
 
//   // This following section will display the update-form that takes the input from the user to update the data.
//   render() {
//     return (
//       <div className="editContainer">
//         <h3 align="center">Update Record</h3>
//         <form onSubmit={this.onSubmit}>
//           <div className="form-group">
//             <label>Description </label>
//             <input
//               type="text"
//               className="form-control"
//               value={this.state.description}
//               onChange={this.onChangeDescription}
//             />
//           </div>
//           <div className="form-group">
//             <label>Revenue: </label>
//             <input
//               type="text"
//               className="form-control"
//               value={this.state.revenue}
//               onChange={this.onChangeRevenue}
//             />
//           </div>
//           <div className="form-group">
//             <label>Cost: </label>
//             <input
//               type="text"
//               className="form-control"
//               value={this.state.cost}
//               onChange={this.onChangeCost}
//             />
//           </div>
//           <br />
 
//           <div className="form-group">
//             <input
//               type="submit"
//               value="Update Record"
//               className="btn btn-primary"
//             />
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
 
// // You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// // higher-order component. This makes it easier for us to edit our records.
 
// export default withRouter(Edit);