const { Travel } = require('../models')


class TravelController {
  static add(req, res, next) {
    let { destination, activity, status, travel_date } = req.body
    Travel.create({
      destination,
      activity,
      status,
      travel_date,
      UserId: req.currentUserId
    })
      .then((travel) => {
        res.status(201).json({ travel })
      })
      .catch(next)
  }

  static display(req, res, next) {
    Travel.findAll({
      where: {
        UserId: req.currentUserId
      }
    })
      .then((travel) => {
        res.status(200).json(travel)
      })
      .catch(next)
  }

  static getById(req, res, next) {
    let id = req.params.id
    Travel.findByPk(id)
      .then((travel) => {
        if (travel) {
          res.status(200).json(travel)
        }
        else {
          next({ name: `travel not found` })
        }
      })
      .catch(next)
  }

  static update(req, res, next) {
    let id = req.params.id
    let { destination, activity, status, travel_date } = req.body
    Travel.update({
      destination,
      activity,
      status,
      travel_date
    }, {
      where: {
        id: id
      },
      returning: true
    })
      .then((data) => {
        if (data[1]) {
          res.status(200).json({ data: data[1][0] })
        }
        else {
          next({ name: `tarvel not found` })
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    let deletedTravel;
    Travel.findByPk(id)
      .then((travel) => {
        if (travel) {
          deletedTravel = travel
          return Travel.destroy({
            where: {
              id: id
            }
          })
        }
        else {
          next({ name: 'travel not found' })
        }
      })
      .then(result => {
        if (result) {
          res.status(200).json(deletedTravel)
        }
        else {
          next({ name: 'travel not found' })
        }
      })
      .catch(next)
  }
}

module.exports = TravelController