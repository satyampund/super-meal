import React, { useState } from 'react';
import './FoodItemCard.css';
import swal from 'sweetalert';
import WalletImg from './../../assests/wallet.png';
import DishImg from './../../assests/quality.png';
import PlusImg from './../../assests/plus.png';
import MinusImg from './../../assests/minus.png';

const FoodItemCard = (props) => {
  const [quantity, setQuantity] = useState(1);

  async function addToList() {
    const listObj = {
      name: props.title,
      price: props.price,
      quantity: quantity,
      total: props.price * quantity,
    };

    //Add list to local storage
    const existingList = JSON.parse(localStorage.getItem('list')) || [];
    existingList.push(listObj);

    localStorage.setItem('list', JSON.stringify(existingList));

    await swal({
      title: 'Success',
      text: 'Item added to Cart',
      icon: 'success',
      button: 'OK',
    });
    window.location.reload();
  }

  return (
    <div className="col-md-3">
      <div className="food-item-card">
        <img src={props.imgUrl} className="food-item-card-header-img" alt="food" />
        <p className="mt-3 title">{props.title}</p>
        <p>{props.description}</p>
        <div className="price-catergory-conatinar">
          <div className="price-catergory-conatinar">
            <img src={WalletImg} className="wallet-img" alt="wallet"></img>
            <p className="ms-2">{`Rs.${props.price}`}</p>
          </div>
          <div className="price-catergory-conatinar">
            <img src={DishImg} className="wallet-img" alt="dish"></img>
            <p className="ms-1">{props.category}</p>
          </div>
        </div>
        <div className="quantity-container">
          <img
            className="count-btn-img mx-3"
            src={MinusImg}
            onClick={(e) => {
              {
                quantity - 1 && setQuantity(quantity - 1);
              }
            }}
          />
          <input
            className="text-center"
            value={quantity}
            type="number"
            min="1"
            max="10"
            disabled></input>
          <img
            className="count-btn-img mx-3"
            src={PlusImg}
            onClick={(e) => {
              setQuantity(quantity + 1);
            }}
          />
        </div>
        <button className="css-button-rounded--red mt-3 mb-3" onClick={addToList}>
          Add to List
        </button>
      </div>
    </div>
  );
};

export default FoodItemCard;
