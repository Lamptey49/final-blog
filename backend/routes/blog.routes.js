import express from 'express'
import blogCtrl from '../controllers/BlogController'
import authCtrl from '../controllers/AuthController'
import userCtrl from '../controllers/UserController'
import multer from 'multer'
import path from 'path'

const router = express.Router()
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../dist/uploads/'), (error, success)=>{

            if(error){
                console.log(error)
            }
        })
    }, 
    filename: function(req, file, cb){
        cb(null, file.originalname +'-'+Date.now(), (error, success)=>{
            if(error){
                console.log(error)
            }
        })
    }
})
var upload = multer({ storage: storage})
 
router.route('/api/new/blog')
    .post( authCtrl.requireSignin,upload.single('image'), blogCtrl.create)
router.route('/api/blogs/by')
    .get(blogCtrl.listBlog)
router.route('/api/blogs/latest')
    .get(blogCtrl.listLatest)
router.route('/api/blogs/related')
    .get(blogCtrl.listRelated)
router.route('/api/blogs/:id')
    .get(blogCtrl.read)
    .put(authCtrl.hasAuthorization, blogCtrl.update)
    .delete(authCtrl.hasAuthorization, blogCtrl.remove)
router.route('/api/blogs/categories')
    .get(blogCtrl.listCategories)
router.route('/api/blogs')
    .get(blogCtrl.list)
router.param('userId', userCtrl.userByID)
router.param('blogId', blogCtrl.blogByID)
export default router