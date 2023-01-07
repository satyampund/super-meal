import mongoose from 'mongoose';

const foodItemSchema = mongoose.Schema({
  title: String,
  description: String,
  imgUrl: String,
  price: Number,
  category: String,
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
