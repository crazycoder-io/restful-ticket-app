import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const trainSchema = new Schema({
    trainName: String,
    firstClassPassengerCapacity: Number,
    secondClassPassengerCapacity: Number,
    lock: {type: Boolean, default: false}
});

module.exports = mongoose.model("Trains", trainSchema);