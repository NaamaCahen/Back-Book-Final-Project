import db from "../config/elephantsql.js";

export const getBooks =async  (req, res) => {
    try {
        const rows = await db('books').select('*');
       res.json(rows);
    } catch (e) {
         res.status(404).json({ msg: e.message })
    }

}

