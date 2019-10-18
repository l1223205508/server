const express = require('express')

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended:false }))

app.use(require('cors')())

require('./routes/admin')(app)
// require('./routes/web')(app)
require('./plugins/db')(app)

app.use('/uploads',express.static(__dirname + '/uploads'))



app.listen(3000,() => {
	console.log('http://localhost:3000')
});