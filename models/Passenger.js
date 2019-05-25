import mongoose from 'mongoose';
import findOrCreate from 'mongoose-find-or-create';
const Schema = mongoose.Schema;

const passengerSchema = new Schema({
    passengerName: String,
    passengerSurname: String,
    contact: String
});

passengerSchema.plugin(findOrCreate);
module.exports = mongoose.model("Passengers", passengerSchema);