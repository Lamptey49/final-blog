import Blog from '../models/BlogModel'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'


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
            res.status(200).json({
                message:'Blog added successfully'
            })
        } catch(error){
            res.status(400).send({ success:false, msg:error.message})
        }
    },
    listBlog: async(req, res)=>{
        try{
            let blogs = await Blog.find().sort('-createdAt').populate('postedBy', 'fullname').exec()
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
    blogByID: async(req, res, next, id)=>{
        try {
            let blog = await Blog.findById(id)
            // .populate('user', '_id fullname').exec()
            if(!blog)
                return res.status(400).json({
                    error:'Blog not found'
                })
            req.blog = blog
            next()
        } catch (err) {
            return res.status(400).json({
                error:'Could not retrieve blog'
            })
        }
    },
    listRelated: async(req, res)=>{
        try {
            let blogs = await Blog.find()
                        .limit(1).exec()
            res.json(blogs)
        } catch (err) {
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
        }
    },
    read:async(req, res)=>{
        // req.blog.image = image
        return res.json(req.blog)
    },
    listCategories:async(req, res)=>{
        try {
            let blogs = await Blog.find().distinct('category', {})
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
       
        try {
            let blog = req.blog
            blog = extend(blog, req.body)
            blog.updated = Date.now()
            blog.created = undefined
            let result = await blog.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
              error: err.message
            })
        }
       
    },
    remove: async(req, res)=>{
        try {
            let blog = req.blog
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