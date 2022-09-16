// import React from 'react'

import { Toast, ToastContainer } from "react-bootstrap"


const ToastMessage = ({show,setShow,msg,position}) => {
    return (
        <ToastContainer className="p-3 text-white" position={position} style={{zIndex:4010}}>
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="success">
            {/* <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Success</strong>
              <small>11 mins ago</small>
            </Toast.Header> */}
            <Toast.Body>{msg.msg}</Toast.Body>
          </Toast>
        </ToastContainer>
    )
}

export default ToastMessage