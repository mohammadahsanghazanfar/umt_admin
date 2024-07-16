import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import Modaling from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store";

const Table1 = ({ dataForTable, Delete, updateUser }) => {
  const [open, setOpen] = useState(false);
  const [editTouched, setEditTouched] = useState(false);
  const [updatedObject, setUpdatedObject] = useState({});
  const datashown = useSelector((state) => state.userData.userData);
  const dispatch = useDispatch();

  const handleEditing = (record) => {
    setUpdatedObject(record);
    setOpen(true);
    setEditTouched(true);
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            style={{ position: "relative", right: "20px" }}
            size="small"
            onClick={() => handleEditing(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            style={{
              marginRight: "8px",
              color: "white",
              backgroundColor: "red",
              position: "relative",
              right: "8px",
            }}
            size="small"
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
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
        sticky={{ offsetHeader: 64 }}
      />
      <Modaling
        open={open}
        onClose={() => {
          setOpen(false);
          setEditTouched(false);
          setUpdatedObject({});
        }}
        editIsClicked={editTouched}
        updateObject={updatedObject}
      />
    </div>
  );
};

export default Table1;
