import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import FoodItemCard from '../../components/FoodItemCard/FoodItemCard';
import { loginRequired } from '../../util/loginRequired';
import { tableBookingRequired } from '../../util/tableBookingRequried';
import CartNavBar from '../../components/Cart/CartNavBar';
import Cart from '../../components/Cart/Cart';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const Dashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [currentFoodItems, setcurrentFoodItems] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleModalCart() {
    setIsCartOpen(!isCartOpen);
    console.log('Button Clicked');
  }

  async function fetchAllItems() {
    console.log('fetching all items');
    const response = await axios.get('/allFoodItems');
    console.log(response.data.data);
    setcurrentFoodItems(response.data.data);
  }

  async function fetchSpecificItems() {
    console.log('fetching specific items');
    const response = await axios.get(`/foodItems?title=${searchText}`);
    console.log(response.data.data);
    setcurrentFoodItems(response.data.data);
  }

  useEffect(() => {
    loginRequired();
    tableBookingRequired();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      fetchSpecificItems();
    } else {
      fetchAllItems();
    }
  }, [searchText]);

  return (
    <>
      <CartNavBar onClickCart={toggleModalCart} />
      <Cart onClickCart={toggleModalCart} isCartOpen={isCartOpen} />
      <div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for dish"
            className="input-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="food-items-result  text-center">
          <div className="container-fluid">
            <div className="row">
              {currentFoodItems?.map((fooditem, index) => {
                return (
                  <FoodItemCard
                    key={index}
                    title={fooditem.title}
                    price={fooditem.price}
                    category={fooditem.category}
                    imgUrl={fooditem.imgUrl}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
