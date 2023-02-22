import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
// import devBundle from './devBundle'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import blogRoutes from './routes/blog.routes'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import React from 'react'
import MainRouter from '../client/src/MainRouter'
import Template from '../client/public/template'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom/server'

import devBundle from  './devBundle'
const app  = express()
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(helmet({
    contentSecurityPolicy:false,
    crossOriginResourcePolicy:false
}))
app.use(cors({ credentials: true,}))
app.use(express.urlencoded({ extended: true}))
app.use('/',userRoutes)
app.use('/', authRoutes)
app.use('/', blogRoutes)

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR,
     'dist')))

app.use('*', (req, res)=> {
    const context = {}
   const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
        <MainRouter />
    </StaticRouter>
   )
   if(context.url){
    return res.redirect(303, context.url)
   }
   res.status(200).send(Template({
        markup: markup
   }))
})
app.use('/',(req, res)=>{
    res.set({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': 'https://scopaf.herokuapp.com',
        'Access-Control-Request-Headers':['GET','POST','PUT','DELETE']
    })
})

app.use((err, req, res, next)=>{
    if(err.name == 'UnauthorizedError'){
        res.status(401).json({'error':err.name + ': '+err.message})
    } else if(err){
        res.status(400).json({'error':err.name + ': '+err.message})
        console.log(err)
    }
})

export default app