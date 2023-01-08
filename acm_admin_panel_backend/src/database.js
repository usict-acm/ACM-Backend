import { promisify } from "util";
import mysql from 'mysql';

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.ACMDATABASE,
});

// black magic to enable async await
export const query = promisify(db.query).bind(db);

export default db;
