const { fetchArtcileById } = require("../model/fetchArticle.model");

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;

  fetchArtcileById(article_id).then((data) => {
    res.status(200).send({ topic: data });
  });
};