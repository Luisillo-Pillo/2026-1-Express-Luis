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

const getBookById = async (req, res) => {
    const { id } = req.params;
    const getBookByIdQuery = "SELECT * FROM libro WHERE libroId=?";
    try {
        const [rows] = await pool.query(getBookByIdQuery, [id]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:"Error consulting books" });
    };
};

const insertBook = async (req, res) => {
    const { nombre, autorId } = req.body;
    const insertBookQuery = "INSERT INTO libro (nombre, autorId) VALUES(?, ?)";
    try {
        const [result] = await pool.query(insertBookQuery, [nombre, autorId]);
        res.status(201).json({ message: "Libro actualizado", book:{ libroId: result.insertId, nombre, autorId } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:"Error updating books" });
    };
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { nombre, autorId } = req.body;
    const updateBookQuery = "UPDATE libro SET nombre=?, autorId=? WHERE libroId=?";
    try {
        const [result] = await pool.query(updateBookQuery, [nombre, autorId, id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({ error:"Book not found" });
        };
        res.json({ message: "Updated book" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:"Error updating books" });
    };
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const deleteBookByIdQuery = "DELETE libro WHERE libroId=?";
    try {
        const [result] = await pool.query(deleteBookByIdQuery, [id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({ error:"Book not found" });
        };
        res.status(204).json({ message: "The book is already gone" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:"Error deleting books" });
    };
};

export { getBooks, getBookById, insertBook, updateBook, deleteBook };