import mongoose from 'mongoose';

const passengerSchema = new Schema({
    passengerName: String,
    passengerSurname: String,
    contact: String
});

module.exports = mongoose.model("Passengers", passengerSchema);