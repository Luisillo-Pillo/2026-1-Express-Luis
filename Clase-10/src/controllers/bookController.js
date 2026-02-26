import pool from "../config/db.js";

const getBooks = async (req, res) => {
    const getQuery = "SELECT libroId,nombre,autorId FROM libro;";
    try {
        const [rows] = await pool.query(getQuery);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:"Error consulting books" });
    };
};

export { getBooks };