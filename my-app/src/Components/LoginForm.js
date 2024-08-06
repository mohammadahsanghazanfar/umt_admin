import React,{useEffect} from "react";
import { Button, Form, Input, notification } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { userActions } from "../store/index";
import { useSelector } from "react-redux";
import { loginActions } from "../store/loginindex";

const LoginForm = ({ checkLogin1 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const found = useSelector((state) => state.loginData.validatelogin);
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(5, "Username must be at most 5 characters")
      .required("Please input your username!"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Please input your password!"),
  });
  const yupSync = {
    async validator({ field }, value) {
      await validationSchema.validateSyncAt(field, { [field]: value });
    },
  };
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "bottomRight",
    });
  };

    useEffect(()=>{
      
      if (found) {
        checkLogin1(true);
        console.log('found',found)

        openNotificationWithIcon(
          "success",
          "Login Successful",
          "Continue with your App"
        );

        setTimeout(() => {
          navigate("/movies");
        }, 1000);
         
        dispatch(loginActions.setValidateLogin(false))
        dispatch(loginActions.setUserName(formik.values.username));
       
      }
    },[found, checkLogin1, navigate, dispatch])  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      let obj = {
        username: values.username,
        password: values.password,
      };

      dispatch(loginActions.checkLogin(obj));
      

    },
  });

  return (
    <Form
      className="loginform"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={formik.handleSubmit}
      rules={[yupSync]}
    >
      <Form.Item
        label="Username"
        name="username"
        style={{ marginBottom: "30px" }}
      >
        <Input
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        style={{ marginBottom: "30px" }}
      >
        <Input.Password
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item style={{ position: "relative", left: "37%", width: "25rem" }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "150%" }}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
