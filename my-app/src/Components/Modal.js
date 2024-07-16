import React, { useEffect } from 'react';
import { Modal } from 'antd';
import MyForm from './Form';
import './Modal.scss';

const Modaling = ({ open, onClose, editIsClicked, updateObject }) => {
  useEffect(() => {
    if (open && editIsClicked) {
      console.log('Editing:', updateObject); // For debugging purposes
    }
  }, [open, editIsClicked, updateObject]);

 

  return (
    <div>
      <Modal
        title="Edit Record"
        open={open}
        onCancel={onClose}
        footer={null} // This removes the default footer with the OK and Cancel buttons
        width={700}
      >
        <MyForm object={updateObject} editIsClicked={editIsClicked} />
      </Modal>
    </div>
  );
};

export default Modaling;
