import mysql from 'mysql2';

// Create the connection to database
export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'route',
});
