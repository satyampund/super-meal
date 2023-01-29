import React from 'react';
import { myFoodListItems } from './../../util/myList';
import './Cart.css';
import axios from 'axios';
import swal from 'sweetalert';
import { currentUser } from '../../util/currentUser';
import { myBookedTable } from '../../util/bookedTable';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const Cart = (props) => {
  async function placeOrder() {
    const response = await axios.post('/orderFoodItems', {
      userId: currentUser._id,
      tableNumber: myBookedTable.tableNumber,
      items: myFoodListItems,
    });

    console.log(response.data.data);
    if (response.data.success) {
      await swal({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        button: 'OK',
      });
      localStorage.removeItem('list');
      window.location.reload();
    }
  }

  return (
    <div>
      <Modal
        isOpen={props.isCartOpen}
        onRequestClose={props.onClickCart}
        contentLabel="My dialog"
        className="myCartmodal"
        overlayClassName="myCartoverlay"
        closeTimeoutMS={200}>
        <div className="cart-container">
          {myFoodListItems.map((item, index) => {
            return (
              <div>
                <h6>Name : {item.name}</h6>
                <h6>Quantity : {item.quantity}</h6>
                <h6>Price : ₹{item.price}</h6>
                <hr></hr>
              </div>
            );
          })}

          <h5 className="my-4 text-center">
            Total Bill : ₹{myFoodListItems.reduce((acc, item) => acc + item.total, 0)}
          </h5>

          <button className="btn btn-danger mx-4" onClick={props.onClickCart}>
            Cancel
          </button>
          <button className="btn btn-danger mx-4" onClick={placeOrder}>
            Order Now
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
