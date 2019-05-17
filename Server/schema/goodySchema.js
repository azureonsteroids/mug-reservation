const mongoose = require('mongoose');

var goodySchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		unique: true,
		required: true
    },
    description: {
		type: String,
		trim: true,
		required: true
    },
	price: {
        type: mongoose.Decimal128,
        required: true
    }
},{ timestamps: { createdAt: 'created_at' }})

module.exports = mongoose.model('Goody', goodySchema);