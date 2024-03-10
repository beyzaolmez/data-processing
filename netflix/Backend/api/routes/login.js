const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const xml2js = require('xml2js');

const convertToXml = (obj) => {
  const builder = new xml2js.Builder();
  return builder.buildObject(obj);
};

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginController.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in login route:', error);
    res.status(error.errorCode || 500).json({ error: error.message });
  }
});


module.exports = router;
