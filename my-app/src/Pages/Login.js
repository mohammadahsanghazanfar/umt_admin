import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import Navbar from '../Components/navbar';
import LoginForm from '../Components/LoginForm';
import './Login.scss';

export default function Login({ checkLogin }) {
  const [openModal, setOpenModal] = useState(false);

  const admin = [
    {
      username: 'admin',
      password: 'admin',
    },
  ];

  const navigate = useNavigate();

  const handleLogin = (obj) => {
    let found = admin.find((user) => {
      return user.username === obj.username && user.password === obj.password;
    });

    if (found) {
      checkLogin(true);
      navigate('/home'); 
    } else {
      setOpenModal(true);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <div className='login-div'>
      <Navbar className='div-1' />
      <h2 className='login-head'>Login</h2>
      <LoginForm checkLogin={handleLogin} />

      <Modal
        title='Invalid credentials'
        open={openModal}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        <p>The username or password you entered is incorrect. Please try again.</p>
      </Modal>
    </div>
  );
}
