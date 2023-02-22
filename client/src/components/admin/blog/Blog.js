import React, { useState, useEffect } from 'react'
import {read, listRelated} from './api-blog'
export default function Blog({ match }) {
    
    const [blog, setBlog] = useState({ blog:{}})
    const [suggestions, setSuggestion] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal 
        read({ blogId: match.params.blogId}, signal).then((data)=> {
            if(data.error){
                setError(data.error)
            } else{
                setBlog(data)
            }
        })
        return function cleanup(){
            // eslint-disable-next-line no-unused-expressions
            abortController.abort
        }
    }, [match.params.blogId])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listRelated({
            blogId: match.params.blogId},
            signal).then((data) => {
                if(data.error){
                    setError(data.error)
                }
                 else{
                    setSuggestion(data)
                 }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [match.params.blogId])

  return (
    <div className='card'>
        
    </div>
  )
}
