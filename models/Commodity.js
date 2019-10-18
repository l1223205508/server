const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name:{type:String},
	file:{type:String}
})

module.exports = mongoose.model('Commodity',schema,'Commodity')