const { Travel } = require('../models')

function authorization(req, res, next) {
  Travel.findOne({
    where: {
      id: req.params.id,
      UserId: req.currentUserId
    }
  })
  .then((travel) => {
    if(travel) {
      next()
    }
    else{
      res.status(401).json({ name:'Not Atuhorized' })
    }
  })
  .catch((err) => {
    res.status(401).json({ name:'Not Atuhorized' })
  })
}

module.exports = authorization