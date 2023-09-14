const app = require("./index");
require('colors');
const connectDb = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
    try {
        await connectDb()
        console.log(`Server is Listening On Port Number :- ${PORT}`.bgGreen.italic)
    } catch (error) {
        console.error(`Error : ${error.message}`.red.bold)
    }
})

   // Handled Promise Rejection
  process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`)
    console.log(
        'Shutting down the server because of Unhandled Promise Rejection'
    )

    server.close(() => {
        process.exit(1)
    })
})