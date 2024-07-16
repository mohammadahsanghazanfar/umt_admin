import React from 'react';
import { Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import './LoginForm.scss';
import * as Yup from 'yup';


const LoginForm = ({ checkLogin }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().max(5, 'Username must be at most 5 characters').required('Please input your username!'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Please input your password!'),
    
  });
  const yupSync = {
    async validator({ field }, value) {
      await validationSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      let obj = {
        username: values.username,
        password: values.password,
      };
      checkLogin(obj);
    },
  });

  return (
    <Form
      className='loginform'
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={formik.handleSubmit}
      rules={[yupSync]}
    >
      <Form.Item label='Username' name='username' style={{ marginBottom: '30px' }}>
        <Input
          name='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        
        />
      </Form.Item>

      <Form.Item 
      label='Password' 
      name='password'
       style={{ marginBottom: '30px' }}>
        <Input.Password
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item style={{ position: 'relative', left: '37%', width: '25rem' }}>
        <Button type='primary' htmlType='submit' size='large' style={{ width: '150%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
