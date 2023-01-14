import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import SignupForm from '../Signup/SignupForm';
import LoginForm from '../Login/LoginForm';
import { currentUser } from '../../util/currentUser.js';
import FoodItemCard from '../../components/FoodItemCard/FoodItemCard';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [currentFoodItems, setcurrentFoodItems] = useState([]);

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
    if (searchText.length > 0) {
      fetchSpecificItems();
    } else {
      fetchAllItems();
    }
  }, [searchText]);

  const logOut = () => {
    if (currentUser) {
      localStorage.removeItem('currentUser');
      window.location.href = '/';
    }
  };
  return (
    <div>
      <h1>Home</h1>
      <h3>{currentUser?.name}</h3>
      <button type="button" className="btn btn-danger" onClick={logOut}>
        Logout
      </button>
      <SignupForm />
      <LoginForm />

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
  );
};

export default Home;
