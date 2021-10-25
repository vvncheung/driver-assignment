import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import './edit.css';
import './styles/button.css'

export default function CreateModal(props) {
  const [unassignedItemsArray, setUnssignedArray] = useState([]);

  const {register, handleSubmit, formState: {errors}} = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:5000/record")
      .then((response) => {
       
        setUnssignedArray({
        array: response.data[0].records
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  console.log('array', unassignedItemsArray)
  const onSubmit = (data) => {
    
    const newItem = {
      description: data.description,
      revenue: data.revenue,
      cost: data.cost,
      orderID: Date.now()
    }

  const addNewItemToArray = (unassignedItemsArray, newItem) => {
    let newArray = unassignedItemsArray.array;
    newArray.push(newItem);
    return newArray;
  }

  const addItemToUnassignedTable = addNewItemToArray(unassignedItemsArray, newItem);

    axios
      // eslint-disable-next-line no-useless-concat
      .post('http://localhost:5000/update/' + '61736fed64468723e1ffcd46', { records: addItemToUnassignedTable })
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
        Add new record
      </div>

      <div className="modalForm">

        <div className="inputDiv">
          <span className="errorMessage">{errors.description && "Please enter description to continue."}</span><br/>
          <span className="modalTextFieldHeaders">Description</span>&nbsp;&nbsp;
          <input className="modalTextFields" type="text" placeholder={'Enter description'} name="description" {...register('description', { required: true })}/><br/>
        </div>
        <div className="inputDiv">
          <span className="errorMessage">{errors.revenue && "Please enter revenue to continue."}</span><br/>
          <span className="modalTextFieldHeaders">Revenue</span>&nbsp;&nbsp;
          <span className="numberSign">$</span><input className="modalTextFields" type="number" placeholder={'Enter number.'} name="revenue" {...register('revenue', { required: true })}/><br/>
        </div>

        <div className="inputDiv">
          <span className="errorMessage">{errors.cost && "Please enter cost to continue."}</span><br/>
          <span className="modalTextFieldHeaders">Cost</span> &nbsp;&nbsp;
          <span className="numberSign">$</span><input className="modalTextFields" type="number" placeholder={'Enter number.'} name="cost" {...register('cost', { required: true })}/><br/>
        </div>

      </div>
      <button className="modalButton" type="submit">Add new record</button>
    </div>
    </form>
  </div> 
  )
}
