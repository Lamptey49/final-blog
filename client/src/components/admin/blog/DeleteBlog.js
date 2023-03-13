import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types'
import { remove } from './api-blog';

export const DeleteBlog = (props) => {
  const [open, setOpen] = useState(false)

  const deleteBlog = () => {
    remove({
        blogId: props.blogId,
        userId: props.userId},
        {t: props.token}).then((data) =>{
        if(data && data.error){
            console.log(data.error)
        } else {
            setOpen(false)
            props.onRemove(props.blog)
        }
    })
  }
  
  return (
    <>
      <Modal
            show={props.open}
            onHide={props.handleRequestClose}
            backdrop="static"
            keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Confirm to delete your blog {props.blog.title}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleRequestClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteBlog}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
DeleteBlog.propTypes = {
  // blogId: PropTypes.string.isRequired,
  // blog: PropTypes.object.isRequired,
  // onRemove: PropTypes.func.isRequired
}
