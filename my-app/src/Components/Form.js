import React, { useState, useEffect } from "react";
import { Form, Button, Input, TreeSelect, Select,Modal } from "antd";
import { useDispatch } from "react-redux";
import { userActions } from "../store/index"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Form.scss';

const MyForm = ({ object, editIsClicked }) => {
  const [Id, setId] = useState(1);
  const dispatch=useDispatch()

  const initialValues = 
    {
      username: '',
      password: '',
      role: '',
      department: '',
    };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please input your username!'),
    password: Yup.string().required('Please input your password!'),
    role: Yup.string().required('Please select something from TreeSelect!'),
    department: Yup.string().required('Please select something from Select Option!')
  });

  const formik = useFormik({
    initialValues: editIsClicked && object ? object :initialValues,
    validationSchema,
    enableReinitialize:true,
    onSubmit: (values) => {
      let obj = {
        id: "user" + "_" + Id,
        username: values.username,
        password: values.password,
        role: values.role,
        department: values.department
      };
     Modal.confirm({
      title:"Confirm Submission",
      content:"Are you sure to submit data",
      okText:"Yes",
      cancelText:"No",
      onOk(){
         dispatch(userActions.add(obj))
      }


    })
      setId(Id + 1);
    },
  });

  const yupSync = {
    async validator({ field }, value) {
      await validationSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const update = () => {
    let obj = {
      id: object.id,
      username: formik.values.username,
      password: formik.values.password,
      role: formik.values.role,
      department: formik.values.department
    };
    Modal.confirm({
      title:"Confirm Update",
      content:"Are you sure to Update data",
      okText:"Yes",
      cancelText:"No",
      onOk(){
         dispatch(userActions.update(obj))
      }


    })
  };

  return (
    <div className="main-div">
      <h3 className="hello">Add Details</h3>
      <Form
        className="form"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label="Username"
          rules={yupSync}
          style={{ marginBottom: "40px" }}
        >
          

          <Input
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.department && formik.errors.department && (
            <span className="error-message">{formik.errors.username}</span>
          )}
        </Form.Item>

        <Form.Item
          label="Password"
          rules={[yupSync]}
          style={{ marginBottom: "40px" }}
        >
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Role"
          rules={[yupSync]}
          style={{ marginBottom: "40px" }}
        >
          <TreeSelect
            style={{ width: '100%' }}
            name="role"
            value={formik.values.role}
            onChange={(value) => formik.setFieldValue("role", value)}
            onBlur={formik.handleBlur}
          >
            <TreeSelect.TreeNode value="student" title="Student" />
            <TreeSelect.TreeNode value="teacher" title="Teacher" />
          </TreeSelect>
        </Form.Item>

        <Form.Item
          label="Dept"
          rules={[yupSync]}
          style={{ marginBottom: "40px" }}
        >
          <Select
            style={{ width: '100%' }}
            name="department"
            value={formik.values.department}
            onChange={(value) => formik.setFieldValue("department", value)}
            onBlur={formik.handleBlur}
          >
            <Select.Option value="software engineering">Software Engineering</Select.Option>
            <Select.Option value="computer science">Computer Science</Select.Option>
          </Select>
          {formik.touched.department && formik.errors.department && (
            <span className="error-message">{formik.errors.department}</span>
          )}
        </Form.Item>

        {!editIsClicked && <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button type="primary" htmlType="submit" disabled={!formik.isValid} onClick={formik.handleSubmit}>
            Submit
          </Button>
        </Form.Item>}
        {editIsClicked && <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button type="primary" htmlType="submit" disabled={!formik.isValid} onClick={update} >
            Update
          </Button>
        </Form.Item>}
      </Form>
    </div>
  );
};

export default MyForm;
