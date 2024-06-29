import mongoose from 'mongoose';

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  details: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
