import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const trainSchema = new Schema({
    trainName: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    firstClassPassengerCapacity: {
        type: Number,
        required: [true, '`{PATH}` field is required!']
    },
    secondClassPassengerCapacity: {
        type: Number,
        required: [true, '`{PATH}` field is required!']
    },
    lock: {type: Boolean, default: false}
});

module.exports = mongoose.model("Trains", trainSchema);