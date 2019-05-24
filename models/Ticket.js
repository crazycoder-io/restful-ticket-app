import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    voyageId: String,
    price: Number,
    seat: Number,
    carriage: Number
});

module.exports = mongoose.model("Tickets", ticketSchema);