import express from 'express'
import userCtrl from '../controllers/UserController'
import authCtrl from '../controllers/AuthController'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
router.route('/api/users/create')
  .post(userCtrl.create)
router.route('/api/users/:userId')
  .get( userCtrl.read)
  .put( authCtrl.hasAuthorization, userCtrl.update)
  .delete( authCtrl.hasAuthorization, userCtrl.remove)
router.route('/api/users/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/api/users/defaultPhoto')
  .get(userCtrl.defaultPhoto)
// router.route('/verify-email').get(userCtrl.verifyEmail)
// router.route('/forgot').post(userCtrl.resetPassword )
router.param('userId', userCtrl.userByID)

export default router
