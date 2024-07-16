import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined,UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.scss'; // Import your CSS file for styles

const Navbar = ({showLog}) => {
  const [selectedKeys, setSelectedKeys] = useState(['home']); 
  
   const navigate=useNavigate()
  const handleClick = (e) => {
    setSelectedKeys([e.key]);
    console.log(e.key);
  };
  const handlelogout=()=>{
       navigate('/')
  }

  return (
    <div className='div-1' >
      <div className='menu-img'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpAnoF8g7BKqNii_LPUWkU_5p8qR54r1CIxA&s' alt='Logo'></img>
        </div>


      <Menu className='nav' mode='horizontal'  selectedKeys={selectedKeys} onClick={handleClick}>
        
        <Menu.Item className='menu-item' key='home' icon={<MailOutlined style={{color:'white'}}/>}>
          <Link to="/home"> <span>Home</span></Link> 
        </Menu.Item>
        <Menu.SubMenu className='menu-item' title='Products' icon={<AppstoreOutlined style={{color:'white'}} />}>
          <Menu.Item key='product1'>Product 1</Menu.Item>
          <Menu.Item key='product2'>Product 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key='submenu2' className='menu-item' title='Settings' icon={<SettingOutlined style={{color:'white'}} />}>
          <Menu.Item key='setting1'>Setting 1</Menu.Item>
          <Menu.Item key='setting2'>Setting 2</Menu.Item>
        </Menu.SubMenu>

     { showLog &&  <Menu.SubMenu className='menu-item2' icon={<UserOutlined style={{ fontSize: '20px', color:'white' }} />}>
        <Menu.Item key={'logout'} onClick={handlelogout}>Logout</Menu.Item>
        </Menu.SubMenu> }
      </Menu>
    </div>
  );
};

export default Navbar;
