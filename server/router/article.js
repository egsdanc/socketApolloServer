const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');

router.get('/makaleler', async (req, res) => {
  const makaleler = await articleController.getArticles();
  res.json(makaleler);
});

router.get('/makale/:id', async (req, res) => {
  const { id } = req.params;
  const makale = await articleController.getArticle(id);
  res.json(makale);
});

router.post('/makale-olustur', async (req, res) => {
  const { baslik, icerik } = req.body;
  const makale = await articleController.createArticle(baslik, icerik);
  res.json(makale);
});

module.exports = router;
