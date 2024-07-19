import React from "react";
import Navbar from "./navbar";
import { Form, Button, Input, Select, Modal, Upload } from "antd";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/index";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useFormik } from "formik";
import * as Yup from "yup";
import "./Form.scss";

const MyForm = () => {
  const dispatch = useDispatch();
  const editIsClicked = useSelector((state) => state.userData.editIsClicked);
  const object = useSelector((state) => state.userData.obj);
  const navigate = useNavigate();
  const id = useSelector((state) => state.userData.id);
  const writers = [
    "William Bonac",
    "Jane Austen",
    "Mark Twain",
    "Emily Dickinson",
    "Leo Tolstoy",
    "Virginia Woolf",
    "Ernest Hemingway",
    "Maya Angelou",
    "Gabriel Garcia Marquez",
    "Haruki Murakami",
  ];

  const initialValues = {
    title: "",
    writer: "",
    releasedate: "",
    avatar: "",
  };

  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please input your username!"),
    writer: Yup.string().required("Please input your password!"),
    releasedate: Yup.string().required(
      "Please select something from TreeSelect!"
    ),
    avatar: Yup.string().required(
      "Please select something from Select Option!"
    ),
  });

  const formik = useFormik({
    initialValues: editIsClicked && object ? object : initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let obj = {
        id: editIsClicked && object ? object.id : "movie" + "_" + id,
        title: values.title,
        writer: values.writer,
        releasedate: values.releasedate,
        avatar: values.avatar,
      };
      Modal.confirm({
        title: "Confirm Submission",
        content: "Are you sure to submit data",
        okText: "Yes",
        cancelText: "No",
        onOk() {
          if (editIsClicked) {
            dispatch(userActions.update(obj));
            dispatch(userActions.setEditIsClicked(false));
          } else {
            dispatch(userActions.add(obj));
            dispatch(userActions.incrementId());
          }
          navigate("/movies");
        },
      });
    },
  });

  const yupSync = {
    async validator({ field }, value) {
      await validationSchema.validateSyncAt(field, { [field]: value });
    },
  };

  return (
    <div>
      <Navbar />
      <div className="main-div">
        <h3 className="hello">Add Details</h3>
        <Form className="form" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Form.Item
            label="Title"
            rules={yupSync}
            style={{ marginBottom: "40px" }}
          >
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item
            label="Writer"
            rules={[yupSync]}
            style={{ marginBottom: "40px" }}
          >
            <Select
              name="writer"
              value={formik.values.writer}
              onChange={(value) => formik.setFieldValue("writer", value)}
            >
              {writers.map((writer) => {
                return (
                  <Select.Option value={writer} key={writer}>
                    {writer}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Release Date"
            rules={[yupSync]}
            style={{ marginBottom: "40px" }}
          >
            <DatePicker
              style={{ width: "100%" }}
              value={formik.values.releasedate}
              onChange={(value) => formik.setFieldValue("releasedate", value)}
              defaultValue={moment()}
              disabledDate={disabledDate}
            />
          </Form.Item>

          <Form.Item
            label="Avatar"
            rules={[yupSync]}
            style={{ marginBottom: "40px" }}
          >
            <Input
              style={{ width: "100%" }}
              name="avatar"
              value={formik.values.avatar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
            >
              {editIsClicked ? "Update" : " Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MyForm;
