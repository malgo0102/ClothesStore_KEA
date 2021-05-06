const verifyIdParam = (req, res, next) => {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }
    next();
  };

 
const authParams = {
    verifyIdParam: verifyIdParam
};

module.exports = authParams;