const mongoose = require('mongoose')

const schema new mongoose.Schema({
	name:{type:String},
	password:{
		type:String,
		select:false,
		set(vale){
			return require('bcrypt').hashSync(val,10)
		}
	}
})

module.exports = mongoose.model('AdminUser',schema,'AdminUser')