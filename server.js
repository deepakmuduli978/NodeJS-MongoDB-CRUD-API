require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const router = express.Router();


// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Database Connection
require('./dbconnection/dbcon');
// Routes
const webRoutes = require('./routes/web');
//Use Routes
app.use('/', webRoutes);
console.log("Control reached here");


// Server Port
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});