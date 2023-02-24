// const queryString = await import('query-string')
// const queryString = require('query-string')
const create = async ( credentials,  blog )=>{
    try {
        const response = await fetch('/api/new/blog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t,
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':true
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

       let response =  await fetch(`/api/blogs/:${params.blogId}`, {
            method:'GET',
            headers:{
                'Accept':'Content-Type',
            },
            signal:signal
        })
        return response.json()
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