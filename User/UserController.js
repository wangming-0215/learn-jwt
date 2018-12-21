const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('./User');

// 创建一个用户
router.post('/create', (req, res) => {
  const { username, password = '123456' } = req.body;
  const hashedPwd = bcrypt.hashSync(password, 8);
  User.create({ name: username, password: hashedPwd }, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    res.status(200).json({ success: true, data: user });
  });
});

// 获取所有用户
router.get('/', (req, res) => {
  User.find({}, { password: 0 }, (err, users) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    res.status(200).json({ success: true, data: users });
  });
});

// 获取某个用户（id）
router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, { password: 0 }, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'No user found.' });

    res.status(200).json({ success: true, data: user });
  });
});

// 删除用户
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    res
      .status(200)
      .json({ success: true, message: `User: ${user.name} has been deleted.` });
  });
});

// 更新用户
router.put('/:id', (req, res) => {
  const { id } = req.params;
  // { new: true }
  // true to return the modified document rather than the original.
  //  defaults to false
  User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    res.status(200).json({ success: true, data: user });
  });
});

module.exports = router;
