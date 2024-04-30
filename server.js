if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

// some recommend this way, but it wasn't working so i used the above based on recommendations
// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv').load()
// }

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) //useNewUrlParser is likely dated and no longer used
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log("connected to mongoose"))



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)