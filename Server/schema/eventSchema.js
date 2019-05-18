const mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
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
		eventDate:{
			type: Date,
			required: true
		}
		
},{ timestamps: { createdAt: 'created_at' }})

module.exports = mongoose.model('Event', eventSchema);