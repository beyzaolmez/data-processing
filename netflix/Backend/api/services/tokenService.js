const jwt = require('jsonwebtoken');
require('dotenv').config();

class tokenService {
  constructor() {
    this.secretKey = process.env.SECRET_KEY;
  }

  generateToken(email,password , expiresIn) {
    const userData = {email, password}
    return jwt.sign({user: userData}, this.secretKey, {expiresIn});
  }
}

module.exports = tokenService;
