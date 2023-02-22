const create = async(user) => {
    try{
        let response = await fetch('/api/users/create',{
            method: 'POST',
            mode:'cors',
            cache:'no-cache',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials:'include',
            body:JSON.stringify(user)
        })
        return await response.json()
    } catch(err){
        console.log(err)
    }
}

const list = async(signal) => {
    try{
        let response = await fetch('/api/users/', {
            method:'GET',
            signal:signal
        })
        return await response.json()
    } catch(err){
        console.log(err)
    }
}

const read = async(params, credentials, signal) => {
    try{
        let response = await fetch('/api/users/', +params.userId, {
            method:'GET',
            signal:signal,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+credentials.t
            }
        }) 
        return await response.json()
    } catch(err){
        console.log(err)
    }
}

const update = async (params, credentials, user) => {
    try{
        let response =await fetch('/api/users/'+params.userId, {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Authorization': 'Bearer '+credentials.t
            },
            body: user
        })
        return await response.json()
    } catch(err){
        console.log(err)
    }
}

const remove = async(params, credentials) => {
    try {
        let response = await fetch('/api/users/' +params.usrId, {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
export { create, list, read, update, remove }