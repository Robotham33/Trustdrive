const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true },
    phone:     { type: String, required: true },
    pickupAddress:   { type: String, required: true },
    dropoffAddress:  { type: String, required: true },
    note:      { type: String },
    date:      { type: String, required: true }, // Format: YYYY-MM-DD
    time:      { type: String, required: true }, // Format: HH:mm
    status:    { type: String, default: 'pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);
