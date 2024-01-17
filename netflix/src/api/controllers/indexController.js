const database = require('../../db/db.js').db;

const getIndexPage = (req, res, next) => {
    res.render('index', {title: "Express"});
};

const goToRegisterPage = (req, res, next) => {
    res.redirect('/register');
};

const getUsers = (req, res, next) => {
    let sql = 'SELECT * FROM user';
    database.query(sql, (err, result) => {
        res.send(result);
    });
};

module.exports = {getIndexPage, goToRegisterPage, getUsers};