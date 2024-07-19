import React, { useState } from "react";
import { Table, Button, Modal, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store";
import { useNavigate } from "react-router-dom";

const Table1 = () => {
  const [open, setOpen] = useState(false);
  const datashown = useSelector((state) => state.userData.userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEditing = (record) => {
    dispatch(userActions.setCheckAdd(true));
    navigate(`/manage-movies/${record.id}`);
    dispatch(userActions.setObject(record));
    dispatch(userActions.setEditIsClicked(true));
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(userActions.delete(record));
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Writer",
      dataIndex: "writer",
      key: "writer",
    },
    {
      title: "Release Date",
      dataIndex: "releasedate",
      key: "releasedate",
      render: (text) => {
        const date = new Date(text);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    },
    {
      title: "Movie",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => {
        return <Avatar src={avatar} size="large" />;
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <span>
          <Button
            type="text"
            style={{ position: "relative", right: "20px", fontSize: "large" }}
            size="large"
            onClick={() => handleEditing(record)}
            icon={
              <EditOutlined style={{ fontSize: "1.5rem", color: "#1677ff" }} />
            }
          ></Button>
          <Button
            type="link"
            style={{
              marginRight: "8px",
              position: "relative",
              right: "16px",
              color: "red",
            }}
            onClick={() => handleDelete(record)}
            icon={<DeleteOutlined style={{ fontSize: "1.5rem" }} />}
          ></Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={datashown}
        rowKey={(record) => record.id}
        scroll={{ x: "max-content" }}
        summary={() => (
          <Table.Summary fixed="bottom">
            <Table.Summary.Row>
              <Table.Summary.Cell>Total Users</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={4}>
                {datashown.length} Users
              </Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
        //sticky={{ offsetHeader: 64 }}
      />
    </div>
  );
};

export default Table1;
