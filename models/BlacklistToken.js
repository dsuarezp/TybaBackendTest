import mongoose from 'mongoose';

const { Schema } = mongoose;

const BlacklistTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const BlacklistToken = mongoose.model('BlacklistToken', BlacklistTokenSchema);

export default BlacklistToken;
