const mongoose = require('mongoose');

var eventRegisterSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	eventname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{ timestamps: { createdAt: 'created_at' }})


eventRegisterSchema.methods = {
}

module.exports = mongoose.model('EventRegister', eventRegisterSchema);