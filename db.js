const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sangituser',
    password:'pass@123',
    database:'todos_db',
  });
  
  db.connect((err) => {
    if (err) {
      console.error('databases is not connected:', err);
    } else {
      console.log('Database Connected successfully ');
    }
  });
  

  module.exports = db;