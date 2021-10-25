import { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form";
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