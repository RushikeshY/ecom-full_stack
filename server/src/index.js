const express = require('express')
const app = express()
const cors = require('cors')
// middleware
app.use(express.json())

app.use(cors())

app.use('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/static/index.html'))
})

module.exports = app