const mongoose = require('mongoose');

var goodyOrderSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	goodyName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{ timestamps: { createdAt: 'created_at' }})


goddyOrderSchema.methods = {
}

module.exports = mongoose.model('GoodyOrder', goodyOrderSchema);