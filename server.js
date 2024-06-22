const express = require('express')
const app = express()
require('dotenv').config()
require('colors')

const PORT = process.env.PORT || 3000

require('./config/db')()
require('./utils/create.Admin')()
app.use(express.json())

app.use('/auth', require('./router/auth.router'))
app.use('/rank', require('./router/rank.router'))
app.use('/location', require('./router/location.router'))
app.use('/otryad', require('./router/otryad.router'))

app.use(require('./middleware/errorHandler'))

app.listen(PORT, () => {
    console.log(`server runing on port : ${PORT}`.blue)
})