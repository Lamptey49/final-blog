import axios from "axios"
// import queryString from "query-string"
// const queryString = require('query-string')
const create = async ( params, credentials,  blog )=>{
    try {
        const response = await fetch('/api/new/blog'+params.userId, {
            method:'POST',
            headers: {
                
                'Authorization': 'Bearer ' + credentials.t,
            },
            body: blog
        })
        
        return await response.json()
        
    } catch (err) {
        return console.log(err)
    }
}
const  list = async (params, signal)=> {
    // const query = queryString.stringify(params)
    let query = ''
    
    try {
        const response = await fetch('/api/blogs?' + query, {
            method: 'GET'
        })
        return await response.json()
    } catch (err) {
        return console.log(err)
    }
}

const read = async( params, signal) => {
    try{

        await fetch(`/api/blogs/${params.blogId}`, {
            method:'GET',
            headers:{
                'Accept':'Content-Type',
                'Content-Type':'application/json'
            },
            signal:signal
        }).then(response =>{
            return response.json()}
        )
    }
    catch(err){
        console.log(err)
    }
       
}

const listBlogs = async(signal) => {
    await fetch('/api/blogs/by', {
        method:'GET',
        
    }).then(response => {
        return response.json()
    })
}

const update = async(params, credentials, blog) => {
    try {
        let response = await fetch('/api/blog/'+params.blogId,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer '+credentials.t
            },
            body:blog
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}
const remove = async(params, credentials)=>{
    try {
        let response = await fetch('/api/blog/'+params.blogId, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
        })
        return response.json()
      } catch(err) {
        console.log(err)
      }
}
export {
    create,
    list,
    read,
    update,
    remove,
    listBlogs
}