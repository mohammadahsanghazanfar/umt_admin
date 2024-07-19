import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";

import Table1 from "../Components/Table";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store";
const { Content, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkAdd = useSelector((state) => state.userData.checkAdd);

  const addMovieHandle = () => {
    dispatch(userActions.setCheckAdd(true));
    dispatch(userActions.setObject({}));
    dispatch(userActions.setEditIsClicked(false));
    navigate("/manage-movies/new");
  };

  useEffect(() => {
    dispatch(userActions.setLog(true));
    console.log("CheckAdd", checkAdd);
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Navbar />
      <Layout className="layout">
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Button
              className="addButton"
              type="primary"
              onClick={addMovieHandle}
            >
              {" "}
              Add Movie
            </Button>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Table1 />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
