const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255),
      username VARCHAR(50) UNIQUE NOT NULL
  )
`;

module.exports = userSchema;