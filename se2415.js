#!/usr/bin/env node

const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

// Database connection configuration
const dbConfig = {
  host: "localhost",
  user: "harris",
  password: "Database@10", // Replace with your MySQL root password
  database: "auth_db",
};

async function registerUser(username, password) {
  if (!username || !password) {
    console.error("Error: Username or Password cannot be empty.");
    process.exit(1);
  }

  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the user into the database
    const insertQuery = `
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [username, hashedPassword]);

    console.log("User registered successfully with userId:", result.insertId);

    // Close the connection
    await connection.end();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Parse command-line arguments
const args = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: se2415 --usermod --username <username> --password <password>")
  .option("usermod", { type: "boolean", describe: "Register a new user", demandOption: true })
  .option("username", { type: "string", describe: "Username for the new user", demandOption: true })
  .option("password", { type: "string", describe: "Password for the new user", demandOption: true })
  .help("h")
  .alias("h", "help").argv;

// Run the registration function
if (args.usermod) {
  registerUser(args.username, args.password);
}
