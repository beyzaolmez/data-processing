const db = require('../../db/db').db;

const addProfile = async (req, res) => {
    const { user_id } = req.params.userId; 
    const { profile_name, profile_image, profile_age, profile_language } = req.body;

    try {
        const sql = `INSERT INTO profile (user_id, profile_name, profile_image, profile_age, profile_language) 
                     VALUES (?, ?, ?, ?, ?)`;

        const result = await db.query(sql, [user_id, profile_name, profile_image, profile_age, profile_language]);

        if (result.affectedRows === 1) {
            return res.status(200).json({ message: 'Profile created successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to create profile' });
        }
    } catch (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({ error: 'Failed to create profile' });
    }
};

module.exports = { addProfile };
