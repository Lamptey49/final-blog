import { signout } from "./api-auth"
import cookie from 'js-cookie'
const auth = {
    authenticate(jwt, cb){
        if(typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        cb()
    },
    isAuthenticated(){
        if(typeof window !== 'undefined')
            return false 
        const getJwt = sessionStorage.getItem('jwt')
        if(getJwt)
            return JSON.parse(getJwt)
        else
            return false
    },
    getCookie: key =>{
        if(typeof window == 'undefined'){
            cookie.get(key)
        }
    },
    clearJWT(){
        if(typeof window !== 'undefined')
            sessionStorage.removeItem('jwt')
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
       
    },
    updateUser(user, cb) {
        if(typeof window !== "undefined"){
          if(sessionStorage.getItem('jwt')){
             let auth = JSON.parse(sessionStorage.getItem('jwt'))
             auth.user = user
             sessionStorage.setItem('jwt', JSON.stringify(auth))
             cb()
           }
        }
      }

}

export default auth