import { useForm } from "react-hook-form";
import axios from "axios";
import './edit.css';
import './styles/button.css'

export default function EditModal(props) {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post('http://localhost:5000/update/' + props.orderID, {
        revenue: data.revenue,
        cost: data.cost

    // props.setRecords(oldRecords => {
    //   let newRecords = JSON.parse(JSON.stringify(oldRecords)); 
    //   newRecords[props.driverIndex].records[props.itemIndex].revenue = data.revenue;
    //   newRecords[props.driverIndex].records[props.itemIndex].cost = data.cost;
    //   return newRecords;
    // }
      }
      .then((res) => {
        console.log(res);
        })
      )
    };


return (
  <div className="modalContainer">
     <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="modalTitle">
          placeholder{props.description}
        </div>

        <div className="modalForm">

          <div className="inputDiv">
            <span className="errorMessage">{errors.revenue && "Please enter revenue to continue."}</span><br/>
            <span className="modalTextFieldHeaders">Revenue</span>&nbsp;&nbsp;
            <span className="numberSign">$</span><input className="modalTextFields" type="number" placeholder={props.revenue} name="revenue" {...register('revenue', { required: true })}/><br/>
          </div>

          <div className="inputDiv">
            <span className="errorMessage">{errors.cost && "Please enter cost to continue."}</span><br/>
            <span className="modalTextFieldHeaders">Cost</span> &nbsp;&nbsp;
            <span className="numberSign">$</span><input className="modalTextFields" type="number" placeholder={props.cost} name="cost" {...register('cost', { required: true })}/><br/>
          </div>

          </div>
            <button className="modalButton" type="submit">Add new record</button>
          </div>
    </form>
  </div>
    
  );
}


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