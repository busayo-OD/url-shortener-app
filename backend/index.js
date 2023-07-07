const app = require('./app')
const connectDB = require('./src/database/db');
require("dotenv").config()

const PORT = process.env.PORT

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log('Server running on port, ', PORT)
})