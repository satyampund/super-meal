import mongoose, { Schema } from 'mongoose';

const tableSchema = mongoose.Schema({
  tableNumber: Number,
  occupied: Boolean,
  occupiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Table = mongoose.model('Table', tableSchema);

export default Table;
