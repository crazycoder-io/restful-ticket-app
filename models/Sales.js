import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    ticketId: String,
    passengerId: String,
    seat: Number,
    carriage: Number,
    classType: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sales", salesSchema);