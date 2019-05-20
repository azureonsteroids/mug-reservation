const mongoose = require('mongoose');

var goodyOrderSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	goodyname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{ timestamps: { createdAt: 'created_at' }})


goodyOrderSchema.methods = {
}

module.exports = mongoose.model('GoodyOrder', goodyOrderSchema);