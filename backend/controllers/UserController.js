import User from '../models/UserModel'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import profileImage from './../../dist/uploads/user-logo.jpg'
const userCtrl = {
      create : async(req, res) => {
          const user = new User(req.body)
          try {
           await user.save()
            res.status(200).json({
                message:'Signed up successfully'
            })
             
          } catch (err) {
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            })
          }
      },
      userByID :async (req, res, next, id) => {
        try {
          let user = await User.findById(id)
          if (!user)
            return res.status(400).json({
              error: "User not found"
            })
          req.profile = user
          next()
        } catch (err) {
          return res.status('400').json({
            error: "Could not retrieve user"
          })
        }
      },
      read : (req, res) => {
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        return res.json(req.profile)
      },
      list :async (req, res) => {
        try {
          let users = await User.find().select('fullname email updated created')
          res.json(users)
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
      },
      update : async (req, res) => {
        let form = new formidable.IncomingForm()
        form.keepExtensions = true 
        form.parse(req, async(err, fields, files)=>{
          if(err){
            return res.status(400).json({
              error:'Photo could not be uploaded'
            })
          }
          let user = req.profile
          user = extend(user, req.body)
          user.updated = Date.now()
          if(files.photo){
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
          }
          try {
            await user.save()
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
          } catch (err) {
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            })
          }
        })
      
      },
      remove : async (req, res) => {
        try {
          let user = req.profile
          let deletedUser = await user.remove()
          deletedUser.hashed_password = undefined
          deletedUser.salt = undefined
          res.json(deletedUser)
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
      },
      admin : (req, res, next)=>{
        const isAdmin = req.profile && req.profile.admin
        if(!isAdmin){
          return res.status(403).json({
            error: 'You are not an Admin' 
          })
        }
        next()
      },
      photo:(req, res, next)=>{
        if(req.profile.data){
          res.set('Content-Type', req.profile.photo.contentType)
            return res.send(req.profile.photo.data)
        }
        next()
      },
      defaultPhoto:(req, res)=>{
        return res.sendFile(procss.cwd()+profileImage)
      }
}

export default userCtrl
