import React from 'react';
import './FoodItemCard.css';

const FoodItemCard = (props) => {
  return (
    <div className="col-md-3">
      <div className="food-item-card">
        <img src={props.imgUrl} className="food-item-card-header-img" alt="food" />
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <p>{props.category}</p>
      </div>
    </div>
  );
};

export default FoodItemCard;
