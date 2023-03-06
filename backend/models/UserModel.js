import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    
    fullname:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String,
    about:{
        type:String
    },
    role:{
        type:Number,
        trim:true,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    resetPasswordLink:{
        data:String,
        default:''
    },
    admin:{
        type:Boolean,
        default:false
    },
    updated: Date,
    created: {
    type: Date,
    default: Date.now
  },

},
)
userSchema.virtual('password')
    .set(function(password){
        this._password = password 
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    }).get(function(){
        return this._password
    })
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
            .createHash('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch(err){
            return ''
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

userSchema.path('hashed_password').validate(function(v){
        if(this._password && this._password.length < 6){
            this.invalidate('password', 'Password must be at least 6 characters long.');
        }
        if(this.isNew && !this._password){
            this.invalidate('password', 'Password is required')
        }
    }, null)

export default mongoose.model('User', userSchema)