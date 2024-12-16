const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require('path');
const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./auth/authRoutes");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoutes);

app.get('/', (rew, res) => {
  res.redirect('/api');
})

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/api/dashboard', (req, res) => {
  const { username } = req.query;  // Extract username from the query string
  if (!username) {
    return res.status(400).send("Username is required.");
  }
  
  // Send the dashboard page with a welcome message
  res.send(`<h1>Welcome, ${username}!</h1>`);
});

connectDB();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});