import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalDialog, ModalTitle } from "react-bootstrap"
import { Navigate } from "react-router-dom"
import PropTypes from 'prop-types'
import auth from "../../../auth/auth-helper"
import { remove } from "../../../auth/api-user"
export default function DeleteUser(props) {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
  
    const jwt = auth.isAuthenticated()
    const clickButton = () => {
      setOpen(true)
    }
    const deleteAccount = () => { 
      remove({
        userId: props.userId
      }, {t: jwt.token}).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
          auth.signout(() => console.log('deleted'))
          setRedirect(true)
        }
      })
    }
    const handleRequestClose = () => {
      setOpen(false)
    }
    
    if (redirect) {
      return <Navigate to='/'/>
    }
      return (<span>
        <Button aria-label="Delete" onClick={clickButton} color="secondary">
          Delete
        </Button>
  
        <Modal open={props.open} onClose={handleRequestClose}>
          <ModalTitle>{"Delete Account"}</ModalTitle>
          <ModalBody>
              Confirm to delete your account.
          </ModalBody>
          <ModalDialog>
            <Button onClick={handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
              Confirm
            </Button>
          </ModalDialog>
        </Modal>
      </span>)
  
  }
  DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
  }