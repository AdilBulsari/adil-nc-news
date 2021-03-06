const { updateArticleById } = require("../model/patchArticle.model");
exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;

  const updateArticle = req.body;

  updateArticleById(updateArticle, article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
