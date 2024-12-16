const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userId  INT UNIQUE NOT NULL AUTO INCEREMENT,
      password VARCHAR(255),
      username VARCHAR(50) UNIQUE NOT NULL
  )
`;

module.exports = userSchema;