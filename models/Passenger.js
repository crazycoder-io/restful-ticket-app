import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const passengerSchema = new Schema({
    passengerName: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    passengerSurname: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    contact: {
        type: String,
        required: [true, '`{PATH}` field is required!'],
        unique: true
    }
});

module.exports = mongoose.model("Passengers", passengerSchema);