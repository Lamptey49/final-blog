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


const app  = express()
// devBundle.compile(app)

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
    res.sendFile(path.join(CURRENT_WORKING_DIR, 'scopaf-blog/public/index.html'))
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