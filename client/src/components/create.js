import { useForm } from "react-hook-form";
// import axios from "axios";
import './edit.css';
import '../styles/button.css'

export default function CreateModal(props) {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data) => {
    // NOT WORKING -- this method should update database
    // axios.post('http://localhost:5000/update/' + props.orderID, {
    //     revenue: data.revenue,
    //     cost: data.cost
    //   }
    //   .then((res) => {
    //     console.log(res);
    //     })
    //   )
    console.log(data)
    props.setRecords(oldRecords => {
      let newRecords = JSON.parse(JSON.stringify(oldRecords)); 
      newRecords[props.driverIndex].records[props.itemIndex].driver = 'unassigned';
      newRecords[props.driverIndex].records[props.itemIndex].description = data.description;
      newRecords[props.driverIndex].records[props.itemIndex].revenue = data.revenue;
      newRecords[props.driverIndex].records[props.itemIndex].cost = data.cost;
      return newRecords;
    }) 
  }



return (
  <div className="modalContainer">
    <button className="closeModal" onClick={() => props.setTrigger(false)}>x</button>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modalTitle">
        Add new record
      </div>
        <span className="errorMessage">{errors.revenue && "Please enter description to continue."}</span><br/>
        <span className="errorMessage">{errors.revenue && "Please enter revenue to continue."}</span><br/>
        <span className="errorMessage">{errors.cost && "Please enter cost to continue."}</span><br/>
        <div className="modalForm">
          <span className="modalTextFieldHeaders">Description</span><br/>
          <input className="modalTextFields" type="text" placeholder={props.description} name="description" {...register('description', { required: true })}/><br/>
          
          <span className="modalTextFieldHeaders">Revenue</span><br/>  
          <span className="numberSign">$</span><input className="modalTextFields" type="number" placeholder={props.revenue} name="revenue" {...register('revenue', { required: true })}/><br/>
          
          <span className="modalTextFieldHeaders">Cost</span><br/>
          <span className="numberSign">$</span><input className="modalTextFields" type="number" placeholder={props.cost} name="cost" {...register('cost', { required: true })}/><br/>
        </div>
        <button className="modalButton" type="submit">Add new record</button>
    </form>
  </div>
    
  )
}

// import React, { Component } from "react";
// import axios from 'axios';
// import './create.css'
 
// export default class Create extends Component {
//   // This is the constructor that stores the data.
//   constructor(props) {
//     super(props);
 
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeDriver = this.onChangeDriver.bind(this);
//     this.onChangeRevenue = this.onChangeRevenue.bind(this);
//     this.onChangeCost = this.onChangeCost.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
 
//     this.state = {
//       description: "",
//       driver: "",
//       revenue: "",
//       cost: "",
//     };
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
 
// // This function will handle the submission.
//   onSubmit(e) {
//     e.preventDefault();
 
//     // When post request is sent to the create url, axios will add a new record(newperson) to the database.
//     const newRecord = {
//       description: this.state.description,
//       driver: this.state.driver,
//       revenue: this.state.revenue,
//       cost: this.state.cost,
//     };
 
//     axios
//       .post("http://localhost:5000/record/add", newRecord)
//       .then((res) => console.log(res.data));
 
//     // We will empty the state after posting the data to the database
//     this.setState({
//       description: "",
//       driver: "",
//       revenue: "",
//       cost: "",
//     });
//   }
 
//   // This following section will display the form that takes the input from the user.
//   render() {
//     return (
//       <div className="createContainer">
//         <h3>Create New Record</h3>
//         <form onSubmit={this.onSubmit}>
//           <div className="form-group">
//             <label>Description: </label>
//             <input
//               type="text"
//               className="form-control"
//               value={this.state.description}
//               onChange={this.onChangeDescription}
//             />
//           </div>
//           <div className="form-group">
//             <label>Driver: </label>
//             <input
//               type="text"
//               className="form-control"
//               value={this.state.driver}
//               onChange={this.onChangeDriver}
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
//           {/* <div className="form-group">
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="priorityOptions"
//                 id="priorityLow"
//                 value="Intern"
//                 checked={this.state.person_level === "Intern"}
//                 onChange={this.onChangePersonLevel}
//               />
//               <label className="form-check-label">Intern</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="priorityOptions"
//                 id="priorityMedium"
//                 value="Junior"
//                 checked={this.state.person_level === "Junior"}
//                 onChange={this.onChangePersonLevel}
//               />
//               <label className="form-check-label">Junior</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="priorityOptions"
//                 id="priorityHigh"
//                 value="Senior"
//                 checked={this.state.person_level === "Senior"}
//                 onChange={this.onChangePersonLevel}
//               />
//               <label className="form-check-label">Senior</label>
//             </div>
//           </div> */}
//           <div className="form-group">
//             <input
//               type="submit"
//               value="Create record"
//               className="btn btn-primary"
//             />
//           </div>
//         </form> 
//       </div>
//     );
//   }
// }