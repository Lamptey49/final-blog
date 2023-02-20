import app from './express'
import mongoose from 'mongoose'
import config from './../config/config'


mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)
mongoose.connect(config.mongoUri, { useNewUrlParser: true,  useUnifiedTopology:true })
        .then(()=>console.log(`Database connected successfully`))
        .catch(err => {
            console.log(err)
        })


app.listen(config.port, (err)=>{
    if(err){
        console.log(err)
    }
    console.info(`Server started on port ${config.port}`)
})