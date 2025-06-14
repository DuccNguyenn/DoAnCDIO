import { auth } from "@/auth";
import Login from "@/componemt/AuthComponent/login";
import { ConfigProvider } from "antd";
import React from "react";

const LoginPage = async () => {
  const session = await auth();
  console.log(session);
  return (
    <ConfigProvider>
      <Login />
    </ConfigProvider>
  );
};

export default LoginPage;
