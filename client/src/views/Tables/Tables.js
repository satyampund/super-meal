import React, { useState } from 'react';
import './Tables.css';
import axios from 'axios';
import swal from 'sweetalert';
import AvailableTable from './../../assests/available-table.png';

const Tables = () => {
  const [availabeTable, setAvailabeTable] = useState([]);
  // const [bookTable, setBookTable] = useState('');
  // const [tableNumber, setTableNumber] = useState('');
  // const [userId, setuserId] = useState('');

  async function fetchAvailabeTalbles() {
    console.log('fetching all tables');
    const response = await axios.get('/availableTables');
    console.log(response.data.data);
    setAvailabeTable(response.data.data);
  }

  async function bookThisTable(e) {
    console.log('Booking Table');
    const data = e.target.id;
    const tempArr = data.split(',');
    console.log(tempArr);

    const response = await axios.post('/bookTable', {
      tableNumber: Number(tempArr[0]),
      userId: tempArr[1],
    });

    console.log(tempArr[0]);

    console.log(response.data.data);
    if (response.data.data.occupied) {
      await swal({
        title: 'Success',
        text: 'Table Booked Successfully',
        icon: 'success',
        button: 'OK',
      });
      window.location.href = '/dashboard';
    }
  }

  return (
    <>
      <button onClick={fetchAvailabeTalbles} className="btn btn-danger">
        Avalilabe Tables
      </button>

      <div className="container">
        <div className="row text-center">
          {availabeTable?.map((table, index) => {
            return (
              <div className="col-4">
                <p>Table Number - {table.tableNumber}</p>
                <img
                  src={AvailableTable}
                  className="table"
                  id={[table.tableNumber, table._id]}
                  alt="random"
                  onClick={bookThisTable}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tables;
