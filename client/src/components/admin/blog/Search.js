
import React from 'react'
import {list} from './api-blog'
import Blog from './Blog'

export default function Search() {

    const [values, setValues] = useState({
        search:'',
        searched:false,

    })
    const search = () =>{
        if(values){
            list({
                search: values.search || undefined, category: values.category
            }).then((data)=> {
                if(data.error){
                    console.log(data.error)
                } else{
                    setValues({...values, results: data, searched: true})
                }
            })
        }
    }
    const enterkey = (event) => {
        if(event.keyCode == 13){
            event.preventDefault()
            search()
        }
    }
  return (
    <div>
        <div className="input-group">
            <input type="text" onKeyDown={enterkey} onChange={handleChange('search')} className="form-control" placeholder="Search"  />
        </div>
        <input type={button} className='btn btn-primary' onClick={search} title='Search' />
        <Blog blogs={results} searched={searched} />
    </div>
  )
}
