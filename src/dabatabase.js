const mysql = require('mysql');
// mysql no soporta promesas, por eso utilizo este modulo
const { promisify } = require('util');

//uso destructuring , solo quiero una parte
const { database } = require('./keys');

//crea conexion;
const pool = mysql.createPool(database); 

pool.getConnection((err, connection) => {
     if (err) {
    console.error('Error connecting');
    return;
  }
 
 
  
    if (connection) connection.release();
    console.log("DB is Connected");
  
    return;
  });

  //transformo callback a promesas
  pool.query = promisify(pool.query);

  module.exports = pool;

