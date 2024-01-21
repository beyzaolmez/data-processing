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

    const contentType = req.headers['accept'] || 'application/json';

    if (contentType.includes('xml')) {
      const xmlResult = convertToXml(result);
      res.status(200).type('application/xml').send(xmlResult);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error('Error in registration route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
