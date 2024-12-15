const mysql = require("mysql");
const config = require("./config");
const pool = mysql.createPool(config);


  const checkRecordExists = (tableName, column, value) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${tableName} WHERE ${column} = ? `;
  
      pool.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results[0] : null);
        }
      });
    });
  };
  

  
  module.exports = {
    checkRecordExists,
  };
  