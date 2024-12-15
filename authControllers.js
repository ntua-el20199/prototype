const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("./userSchema");
const bcrypt = require("bcryptjs");
const { checkRecordExists } = require("./sqlFunctions");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    res
      .status(400)
      .json({ error: "Username or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "username", username);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials 0" });
        return;
      }

      const passwordMatch = password === existingUser.password;

      if (passwordMatch) {
        res
        .status(200)
        .redirect(`/api/dashboard?username=${encodeURIComponent(username)}`);
      } else {
        res.status(401).json({ error: "Invalid credentials 1" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials 2" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
};