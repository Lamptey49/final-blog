import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types'
import { remove } from './api-blog'
import auth from '../../../auth/auth-helper'
import { createRoot } from 'react-dom/client';
export const DeleteBlog = (props) => {
    const [open, setOpen] = useState(false)
    
    const jwt = auth.isAuthenticated()
    const deleteBlog = () => {
        remove({blogId: blog._id}, {t: jwt.token}).then((data) =>{
            if(data && data.error){
                console.log(data.error)
            } else {
                setOpen(false)
                props.onRemove(props.blog)
            }
        })
    }
    const handleRequestClose = () => {
        setOpen(false)
    }
  return (
    <>
        <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={open}
        onHide={handleRequestClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.blog.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Confirm to delete your product {props.blog.title}.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRequestClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteBlog}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export function renderDelete(){
    return(<DeleteBlog />)
}

// DeleteBlog.propTypes = {
//     blogId: PropTypes.string.isRequired,
//     blog:PropTypes.object.isRequired,
//     onRemove: PropTypes.func.isRequired
// }