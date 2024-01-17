const renderRegister = (req, res, next) => {
    res.render('register', {title: "register"});
};

// newUser function for post user route
const newUser = (req, res, next) => {
    res.json({message: "POST new tea"}); // dummy function for now
};

module.exports = {newUser, renderRegister};