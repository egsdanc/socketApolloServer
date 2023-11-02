const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/kullanicilar', async (req, res) => {
  const kullanicilar = await userController.getUsers();
  res.json(kullanicilar);
});

router.get('/kullanici/:id', async (req, res) => {
  const { id } = req.params;
  const kullanici = await userController.getUser(id);
  res.json(kullanici);
});

router.post('/kullanici-olustur', async (req, res) => {
  const { Ad, Soyad, Tel, Makaleid } = req.body;
  const kullanici = await userController.createUser(Ad, Soyad, Tel, Makaleid);
  res.json(kullanici);
});

module.exports = router;
