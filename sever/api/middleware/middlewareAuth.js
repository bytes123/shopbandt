const jwt = require("jsonwebtoken");

const middlewareAuth = {
  // VerifyToken

  verifyToken: (req, res, next) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];

      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json("Token không hợp lệ");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("Bạn không được quyền làm điều này !");
    }
  },

  verifyTokenAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("Bạn không có quyền");
      }
    });
  },
};

module.exports = middlewareAuth;
