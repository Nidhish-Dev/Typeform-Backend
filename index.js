require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/forms');
const connectDB = require('./db/connection');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
connectDB();

app.get("/", (req,res)=>{
  res.send("Server is Healthy and Running")
})

// Routes
app.use('/auth', authRoutes);
app.use('/forms', formRoutes);

// Start the server
const PORT = process.env.PORT || 8000; // Use environment variable for port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
