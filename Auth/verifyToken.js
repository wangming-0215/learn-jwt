const jwt = require('jsonwebtoken');

const { secret } = require('../config');

module.exports = function(req, res, next) {
  let token = req.headers['authorization'] || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'No token provided.'
    });
  }
};
