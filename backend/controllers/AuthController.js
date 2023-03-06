import User from '../models/UserModel'
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";
import config from '../../config/config'

const authCtrl = {
  signin : async(req, res) => {
    try {
      let user = await User.findOne({
          "email": req.body.email
        })
  
        if (!user)
          return res.status(401).json({
            error: "User not found"
          })
  
        if (!user.authenticate(req.body.password)) {
          return res.status(401).send({
            error: "Email and password don't match."
          })
        }
        const token = jwt.sign({
          _id: user._id
        }, config.jwtSecret)
  
        res.cookie("t", token, {
          expire: new Date() + 9999
        })
  
        return res.json({
          token,
          user: {_id: user._id,
             fullname: user.fullname,
              email: user.email,
              role:user.role,
              admin:user.admin
            }
        })
    } catch (err) {
      return res.status(401).json({
        error: "Could not sign in"
      })
    }
  },
  signout :(req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
      message: "signed out"
    })
  },
  hasAuthorization : (req, res, next) => {
    const authorized = req.profile && req.auth && 
    req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status(403).json({
      error: "User is not authorized"
    })
  }
  next()
},
  requireSignin : expressjwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms:['HS256']
  })
}

export default authCtrl
