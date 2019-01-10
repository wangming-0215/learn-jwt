const router = require('express').Router();

const Artical = require('./Artical');

// 获取所有文章
router.get('/', (req, res) => {
  Artical.countDocuments({}, (error, total) => {
    if (error)
      return res.status(500).json({ success: false, message: error.message });
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const query = {
      skip: (page - 1) * limit,
      limit
    };
    Artical.find({}, {}, query, (error, articals) => {
      if (error)
        return res.status(500).json({ success: false, message: error.message });
      res.status(200).json({
        success: true,
        data: { list: articals, total, page, limit }
      });
    });
  });
});

// 根据 id 获取文章
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Artical.find({ _id: id }, (error, artical) => {
    if (error)
      return res.status(500).json({ success: false, message: error.message });

    res.status(200).json({ success: true, data: artical });
  });
});

module.exports = router;
