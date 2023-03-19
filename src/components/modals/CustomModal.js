import React from 'react';
import Modal from 'react-modal'

export default function CustomModal({ show, children, onClose, top, left, right, bottom }) {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        },
        content: {
          // position: 'absolute',
          // // top,
          // // left,
          // // top: '50 %',
          // // left: '50 %',
          // // transform: 'translate(-50 %, -50 %)',
          // left: 0,
          // right: 0,
          // 'margin-left': 'auto',
          // 'margin-right': 'auto',
          // // right,
          // // width: 'max-content',
          // bottom,
          // border: '2px solid #E0E0E0',
          // background: '#fff',
          // overflow: 'auto',
          // WebkitOverflowScrolling: 'touch',
          // // borderRadius: '4px',
          // outline: 'none',
          // padding: '20px'


          position: 'absolute',
          top: top,
          left: left,
          right: right,
          bottom: bottom,
          border: '2px solid #E0E0E0',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          // borderRadius: '4px',
          outline: 'none',
          padding: '20px'

        }
      }}
    >
      {children}
    </Modal>
  );
}