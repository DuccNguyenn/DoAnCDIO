'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    TeamOutlined,

} from '@ant-design/icons';
import React, { useContext } from 'react';
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from 'antd';
import Link from 'next/link'

type MenuItem = Required<MenuProps>['items'][number];
const AdminSideBar = () => {
    const { Sider } = Layout;
    const { collapseMenu } = useContext(AdminContext)!;

    const items: MenuItem[] = [

        {
            key: 'grp',
            label: 'Store Item',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link style={{textDecoration: "none"}} href={"/dashboard"}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "users",
                    label: <Link style={{textDecoration: "none"}}  href={"/dashboard/user"}>Manage Users</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: 'products',
                    label: <Link style={{textDecoration: "none"}} href={"/dashboard/product"}>Manager Product</Link>,
                    icon: <MailOutlined />
                },
                {
                    key: 'categoris',
                    label: <Link style={{textDecoration: "none"}} href={"/dashboard/categori"}>Manager Categoris</Link>,
                    icon: <MailOutlined />
                },
                {
                    key: 'order',
                    label: <Link style={{textDecoration: "none"}} href={"/dashboard/order"}>Manager Order</Link>,
                    icon: <MailOutlined />
                },
                {
                    type: 'divider',
                },
                
            ],
        },
    ];

    return (
        <Sider
            collapsed={collapseMenu}
        >

            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
                style={{ height: '100vh' }}
            />
        </Sider>
    )
}

export default AdminSideBar;