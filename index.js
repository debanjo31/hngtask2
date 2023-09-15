// importing express framework
const express = require('express');
const app = express();

// importing .env parser
const dotenv = require('dotenv');
dotenv.config();

// importing monogodb database
const connectDB = require('./config/db');
connectDB();

// importing middlewares
const cors = require('cors');
app.use(cors());

app.use(express.json());

// importing routes
const crudRoutes = require('./routes/crud.routes');

// ROUTES

app.use('/api', crudRoutes);

//initializing server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
