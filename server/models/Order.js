import mongoose, { Schema } from 'mongoose';

const orderSchema = mongoose.Schema({
  orderId: String,
  tableNumber: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
