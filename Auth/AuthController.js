const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

const User = require('../User/User');
const verifyToken = require('./verifyToken');
const { secret, expiresIn } = require('../config');

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  User.create({ name: username, password: hashedPassword }, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
    // if user is registered without errors, create a token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });
    res.status(200).json({ success: true, token });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ name: username }, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'No user found.' });

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({
        success: false,
        message: 'username or password is incorrect.'
      });

    // create a token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });
    res.status(200).json({ success: true, token });
  });
});

router.get('/me', verifyToken, (req, res) => {
  // 获取当前登录人，不包含密码信息
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'No user found.' });

    res.status(200).json({ success: true, data: user });
  });
});

module.exports = router;
