const database = require('../../db/db.js').db;

const getIndexPage = (req, res, next) => {
    res.render('index', {title: "Express"});
};

module.exports = {getIndexPage};