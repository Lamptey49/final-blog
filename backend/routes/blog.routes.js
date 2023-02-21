import express from 'express'
import blogCtrl from '../controllers/BlogController'
import authCtrl from '../controllers/AuthController'
import userCtrl from '../controllers/UserController'

const router = express.Router()
router.route('/api/new/blog')
    .post( authCtrl.requireSignin, blogCtrl.create)
router.route('/api/blogs/by')
    .get(blogCtrl.listBlog)
router.route('/api/blogs/latest')
    .get(blogCtrl.listLatest)
router.route('/api/blogs/related/:id')
    .get(blogCtrl.listRelated)
router.route('/api/blogs/:id')
    .get(blogCtrl.read)
router.route('/api/blog/:userId/:blogId')
    .put(authCtrl.hasAuthorization, blogCtrl.update)
    .delete(authCtrl.hasAuthorization, blogCtrl.remove)
router.route('/api/blogs/categories')
    .get(blogCtrl.listCategories)
router.route('/api/blogs')
    .get(blogCtrl.list)
router.param('userId', userCtrl.userByID)
router.param('blogId', blogCtrl.blogByID)
export default router