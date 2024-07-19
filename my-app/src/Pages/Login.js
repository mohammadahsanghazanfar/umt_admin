import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/navbar";
import LoginForm from "../Components/LoginForm";

import "./Login.scss";
import { userActions } from "../store";
import { loginActions } from "../store/loginindex";

export default function Login({ checkLogin }) {
  const openModal = useSelector((state) => state.loginData.openModal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.setLog(false));
  }, []);

  const checkingLogin = (bool) => {
    checkLogin(bool);
  };

  const handleCancel = () => {
    dispatch(loginActions.setOpanModal(false))
  };

  return (
    <div className="login-div">
      <Navbar />
      <h2 className="login-head">Login</h2>
      <LoginForm checkLogin1={checkingLogin} />

      <Modal
        title="Invalid credentials"
        open={openModal}
         onCancel={handleCancel}
       onOk={handleCancel}
      >
        <p>
          The username or password you entered is incorrect. Please try again.
        </p>
      </Modal>
    </div>
  );
}
