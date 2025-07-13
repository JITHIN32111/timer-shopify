import mongoose from 'mongoose';

const timerSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
  },
  title: String,
  startTime: Date,
  endTime: Date,
  description: String,
});

export const CountdownTimer = mongoose.model('CountdownTimer', timerSchema);
