import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sellSchema = new Schema({
    ticketId: String,
    passengerId: String,
    seat: Number,
    carriage: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sell", sellSchema);