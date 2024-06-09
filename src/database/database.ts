import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "uploadImages"
});

export const getConnection = async () => {
    return await pool.getConnection();
};