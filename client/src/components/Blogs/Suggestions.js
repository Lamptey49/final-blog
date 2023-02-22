import React from 'react'

export const Suggestions = (props) => {
  return (
    <div>
        {props.blogs && props.blogs.map((item, i) =>{
            return <span key={i}>
                <img src={'/api/blog/image/'+item._id} alt={item.slug}/>
                <h2>{item.title}</h2>
                <span>Published on {new Date(item.createdAt).toDateString()}</span>
                <p>{item.body}</p>
            </span>
        })}
    </div>
  )
}
