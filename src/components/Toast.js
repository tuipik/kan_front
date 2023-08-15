import { useState } from 'react';
import BtstrpToast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../store';

export default function Toast() {
 
 const dispatch = useDispatch();

 const { show, config } = useSelector((state) => {
   return state.toast;
 });

 return (
    <ToastContainer position="top-end" className="position-fixed">
      <BtstrpToast
        onClose={() => dispatch(hideToast())}
        show={show}
        {...config}
      >
        <BtstrpToast.Header>{config.header}</BtstrpToast.Header>
        <BtstrpToast.Body>{config.body}</BtstrpToast.Body>
      </BtstrpToast>
    </ToastContainer>
  ); 
}