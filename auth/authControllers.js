const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../db/userSchema");
const bcrypt = require("bcryptjs");
const { checkRecordExists } = require("../db/sqlFunctions");

const login = async (req, res) => {
  const { username, password } = req.body;

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
        res
        .status(401)
        .redirect('api/failedLogin');
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      
      if (passwordMatch) {
        res
        .status(200)
        .redirect(`/api/dashboard?username=${encodeURIComponent(username)}`);
      } else {
        res
        .status(401)
        .redirect('api/failedLogin');
      }
    } else {
      res
      .status(401)
      .redirect('api/failedLogin');
    }
  } catch (error) {
    res
    .status(500)
    .redirect('api/failedLogin');
  }
};

module.exports = {
  login,
};