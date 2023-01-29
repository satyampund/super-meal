import React, { useState, useEffect } from 'react';
import './Tables.css';
import axios from 'axios';
import swal from 'sweetalert';
import AvailableTable from './../../assests/table.png';
import { loginRequired } from '../../util/loginRequired';
import { currentUser } from '../../util/currentUser';

const Tables = () => {
  const [availabeTable, setAvailabeTable] = useState([]);

  useEffect(() => {
    loginRequired();
    fetchAvailabeTalbles();
  }, []);

  async function fetchAvailabeTalbles() {
    console.log('fetching all tables');
    const response = await axios.get('/availableTables');
    console.log(response.data.data);
    setAvailabeTable(response.data.data);
  }

  async function bookThisTable(e) {
    const response = await axios.post('/bookTable', {
      tableNumber: e.target.value,
      userId: currentUser._id,
    });

    console.log(response.data.data);
    localStorage.setItem('bookedTable', JSON.stringify(response.data.data));
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
      <div className="container table-container">
        <div className="row text-center">
          {availabeTable?.map((table, index) => {
            return (
              <div key={index} className="col-md-3 tableCard">
                <p className="tableNumber">Table Number - {table.tableNumber}</p>
                <img src={AvailableTable} className="table" alt="random" />
                <br></br>
                <button
                  className="btn btn-danger"
                  value={table.tableNumber}
                  onClick={bookThisTable}>
                  Book Table
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tables;
