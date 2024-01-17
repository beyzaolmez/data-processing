const renderLoginPage = (req, res, next) => {
    res.render('login', {title: "Login"});
};

module.exports = {renderLoginPage};