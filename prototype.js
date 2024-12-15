const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
const password = 'password123';


const db = mysql.createConnection({
    host: 'localhost',
    user: 'harris',             // Your MySQL username (default is 'root')
    password: 'Database@10',     // Your MySQL password
    database: 'auth_db'       // The database you created
  });

// Connect to MySQL
db.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });


  async function generateHashedPassword() {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('INSERT INTO users (email, password) VALUES (\'user@example.com\', \'' + hashedPassword + '\');');
  }
  
  generateHashedPassword();


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Check if both email and password are provided
  
    // Query the database to check if the email exists
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.execute(sql, [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Database error');
      }
  
      if (results.length === 0) {
        return res.status(400).send('Invalid email or password');
      }
  
      // Get the hashed password from the database
      const user = results[0];
      const storedHashedPassword = user.password;
  
      // Compare the provided password with the stored hashed password
      try {
        const isMatch = await bcrypt.compare(password, storedHashedPassword);
        
        if (isMatch) {
          // Passwords match, login successful
          res.redirect('/dashboard');  // Redirect to dashboard
        } else {
          // Passwords don't match
          res.status(400).send('Invalid email or password');
        }
      } catch (err) {
        console.error('Error during password comparison:', err);
        res.status(500).send('Server error');
      }
    });
  });

// Dashboard page (after successful login)
app.get('/dashboard', (req, res) => {
  res.send('<h1>Welcome to your dashboard!</h1>');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
