const {User} = require('../models')
const {generateToken}= require('../helper/jwt')
const {comparePassword}= require('../helper/bcrypt')

class UserController {
    static signup(req, res, next) {
        const {email, password} = req.body
        let payload = {
            email,
            password
        }
        console.log(req.body)
        User.create(payload)
            .then(result => {
                let user = {
                    id: result.id,
                    email: result.email
                }
                let token = generateToken(user)
                res.status(201).json({
                    id: user.id,
                    email: user.email,
                    access_token: token
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static signin(req, res, next) {
        const {email, password} = req.body
        let payload = {
            email,
            password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
            .then(result => {
                if(result) {
                    let compare = comparePassword(payload.password,result.password)
                    if(compare) {
                        let user = {
                            id: result.id,
                            email: result.email
                        }
                        let token = generateToken(user)
                        res.status(200).json({
                            id: user.id,
                            email: user.email,
                            access_token: token
                        })
                    } else {
                        return next({
                            name: 'BadRequest',
                            errors: [{message: 'Invalid email or password'}]
                        })
                    }
                } else {
                    return next({
                        name: 'BadRequest',
                        errors: [{message: 'Invalid email or password'}]
                    })
                }
            })
            .catch(err => {
                next({
                    name: 'InternalServerError',
                    errors: [{ message: err}]
                })
            })
    }
}

module.exports = UserController