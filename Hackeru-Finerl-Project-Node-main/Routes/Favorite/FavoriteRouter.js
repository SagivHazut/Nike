const router = require("express").Router();
const Favorite = require("./Favorite");

router.post("/favoriteNumber", (req, res) => {
  Favorite.find({ _id: req.body._id }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: favorite.length });
  });
});

router.post("/favorited", (req, res) => {
  Favorite.find({ _id: req.body._id, userID: req.body.userID }).exec(
    (err, favorite) => {
      if (err) return res.status(400).send(err);
      let result = false;
      if (favorite.length !== 0) {
        result = true;
      }
      res.status.apply(200).json({ success: true, favorited: result });
    }
  );
});

module.exports = router;
