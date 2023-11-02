const Article = require('../model/Article.js');

async function getArticles() {
  try {
    return await Article.find();
  } catch (error) {
    throw error;
  }
}

async function getArticle(id) {
  try {
    return await Article.findById(id);
  } catch (error) {
    throw error;
  }
}

async function filterArticles(ids) {
  try {
    return await Article.find({ _id: { $in: ids } });
  } catch (error) {
    throw error;
  }
}

async function createArticle(baslik, icerik) {
  try {
    const article = { baslik, icerik };
    return await Article.create(article);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getArticles,
  getArticle,
  filterArticles,
  createArticle,
};
