import Blog from '../models/BlogModel'
import extend from 'lodash'
import errorHandler from '../helpers/dbErrorHandler'
import fs from 'fs'
import formidable from 'formidable'


const blogCtrl = {
    
    create: async(req, res)=>{
        try{
            let blog = new Blog({
                title: req.body.title,
                slug:req.body.slug,
                body:req.body.body,
                categories:req.body.categories,
                tags:req.body.tags,
                image:req.file.filename,
                postedBy:req.profile
            })
            const result = blog.save()
            res.status(200).send({ success: true, msg:'Blog Published successfully', data:result})
        } catch(error){
            res.status(400).send({ success:false, msg:error.message})
        }
    },
    listBlog: async(req, res)=>{
        try{
            let blogs = await Blog.find().sort('-createdAt').exec()
            res.json(blogs)
        } catch(err){
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
        }
    },
    listLatest: async(req, res)=>{
        try {
            let blogs = await Blog.find({}).sort('-createdAt')
                .limit(1).exec()
            res.json(blogs)
        } catch (err) {
            error: errorHandler.getErrorMessage(err)
        }
    },
    blogByID:async(req, res, next, id)=>{
        try {
            let blog = await Blog.findById(id)
            .populate('blog', 'id title slug body categories tags image createdAt').exec()
            if(!blog)
                return res.status(400).json({
                    error:'Blog not found'
                })
            // req.blog = blog
            next()
        } catch (err) {
            return res.status(400).json({
                error:'Could not retrieve blog'
            })
        }
    },
    listRelated: async(req, res)=>{
        try {
            let blogs =await Blog.find({})
                        .limit(5).populate('blog', '_id title image categories tags createdAt').exec()
            res.json(blogs)
        } catch (err) {
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
        }
    },
    read:async(req, res)=>{
        const id = req.id
        Blog.findOne({id})
        .select('id title body slug image  categories tags postedBy createdAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: 'Could not retrieve blog'
                });
            }
            res.json(data);
        });
    },
    listCategories:async(req, res)=>{
        try {
            let blogs = await Blog.distinct('category', {})
            re.json(blogs)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    },
    list: async(req, res)=>{
        const query = {}
        if(req.query.search)
            query.name = {'$regex':req.query.search, '$options':'i'}
        if(req.query.category = req.query.category != 'All')
            query.category = req.query.category 
        try{
            let blogs = await Blog.find(query).populate('user', '_id fullname')
                .select('-image').exec()
            res.json(blogs)
        } catch(err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    },
    update:async(req, res)=>{
        let form = new formidable.IncomingForm()
        form.keepExtensions = true 
        form.parse(req, async(err, fields, files)=>{
          if(err){
            return res.status(400).json({
              error:'Photo could not be uploaded'
            })
          }
          let blog = new Blog
          blog = extend(blog, fields)
          
          if(files.photo){
            blog.photo.data = fs.readFileSync(files.photo.path)
            blog.photo.contentType = files.photo.type
          }
          try {
            await blog.save()
            res.json(blog)
          } catch (err) {
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            })
          }
        })
    },
    remove: async(req, res)=>{
        try {
            let blog = new Blog()
            let deletedBlog = await blog.remove()
            res.json(deletedBlog)
          } catch (err) {
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            })
          }
    },
    photo:(req, res)=>{
        if(req.blog.image.data){
            res.set('Content-Type',req.blog.image.contentType)
            return res.send(req.blog.image.data)
        }
    }
}

export default blogCtrl