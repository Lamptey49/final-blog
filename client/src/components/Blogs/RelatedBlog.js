import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { list } from './../admin/blog/api-blog'
const RelatedBlog = (props) => {
    const [blogs, setBlogs] = useState([])
    const [selected, setSelected] = useState(props.categories[0])
    useEffect(()=> {
        
        const abortController = new AbortController()
        const signal = abortController.signal

        fetch('/api/blogs/categories', signal, {
            method:'GET',
            headers:{
                'Accept':'application/json'
            }
        }).then(data => {
            setBlogs(data)
            console.log(data)
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal 
        list({ category: props.categories[0]
        }, signal).then((data)=>{
            if(data && data.error){
                console.log(data.error)
            } else{
                setBlogs(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    })

    const listByCategories = category => event => {
        setSelected(category)
        list({ category: category})
        .then((data)=> {
            if(data.error){
                console.log(data.error)
            } else{
                setBlogs(data)
            }
        })
    }
  
  return (
    <div>
       <div className='card'>
            <h2>Featured</h2>
            <div>
                <div className='grid'>
                    {props.categories.map((tile)=>(
                        <div className='grid' key={uuidv4()}>
                            <span onClick={listByCategories(tile)}>{selected === tile }</span>
                        </div>
                    ))}
                </div>
            </div>
       </div>
    </div>
  )
}

export default RelatedBlog
