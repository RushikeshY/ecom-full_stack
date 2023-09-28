const express = require('express');
const app = express()
const cors = require('cors')

// middleware
app.use(express.json())

app.use(cors())

const user = require("./routes/userRoute")


app.use("/api",user)


// app.use('*', (req, res) => {
//     res.sendFile(path.join(process.cwd(), '/static/index.html'))
// })

module.exports = app