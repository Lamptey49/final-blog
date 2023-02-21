import Blog from '../models/BlogModel'
import extend from 'lodash'
import errorHandler from '../helpers/dbErrorHandler'
import fs from 'fs'
import formidable from 'formidable'
import path from 'path'
import { fileURLToPath } from 'url'

const blogCtrl = {
    create: async(req, res)=>{
       
        let form = new formidable.IncomingForm()

        form.keepExtensions = true 
        
        form.parse(req, (err, fields, files)=>{
            let oldPath = files.image.filepath
            let newPath = path.join(__dirname, '../../dist/uploads/' + files.image.name)
            let rawData = fs.readFileSync(oldPath)
           
            let blog = new Blog(fields)
           
            blog.user = req.profile 
            fs.writeFile(newPath, rawData, ()=>{
                if(err){
                    return res.status(400).json({
                        error: errorHandler.getErrorMessage(err)
                    })
                }
            })
            try{
                 blog.save((result)=>{
                    if(err)
                        return res.status(400).json({
                            error:errorHandler.getErrorMessage(err)
                    })
                    res.status(200).json(result)
                })
            } catch(err){
                return res.stats(400).json({
                    error:errorHandler.getErrorMessage(err)
                })
            }
        })
     
    },
    listBlog: async(req, res)=>{
        try{
            let blogs = await Blog.find()
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
            let blog = await Blog.findById(id).populate('blog', 'id title slug body categories tags image createdAt').exec()
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
            let blogs =await Blog.find({"_id":req.blog }, {"category":req.blog.category})
                        .limit(5).populate('blog', '_id title').exec()
            res.json(blogs)
        } catch (err) {
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
        }
    },
    read:async(req, res)=>{
        let blog = await Blog.find({})
        blog.image = undefined 
        return res.json(req.blog)
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
    }
}

export default blogCtrl