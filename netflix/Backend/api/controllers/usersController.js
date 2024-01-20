const db = require('../../db/db').db;

const getUsers = async (req, res) => {
    const sql = 'SELECT user_email FROM user';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            return res.json(results);
        }
    });
};

module.exports = {
    getUsers
};
