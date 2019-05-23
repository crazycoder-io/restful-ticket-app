import mongoose from 'mongoose';

const trainSchema = new Schema({
    trainName: String,
    firstClassPassengerCapacity: Number,
    secondClassPassengerCapacity: Number,
    lock: Boolean
});

module.exports = mongoose.model("Trains", trainSchema);