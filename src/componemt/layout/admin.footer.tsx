"use client";
import { Layout } from "antd";
const AdminFooter = () => {
  const { Footer } = Layout;
  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        Store Food {new Date().getFullYear()} Created by DucNguyen
      </Footer>
    </>
  );
};

export default AdminFooter;
