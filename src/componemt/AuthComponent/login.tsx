"use client";
import React, { useState } from "react";
import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
} from "antd";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getSession, signIn, useSession } from "next-auth/react";
import { authenticate } from "@/utils/action";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalChangePass from "./modal.changepass";
const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  type FieldType = {
    password?: string;
    email?: string;
    remember?: string;
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const { username, password } = values;
    const res = await authenticate(username, password);

    const session = await getSession();

    if (!session || !session.user) {
      notification.error({ message: "Không thể lấy thông tin user!" });
      return;
    }

    const userRole = session.user.role;

    if (res?.error) {
      toast.error(res.error, {
        position: "top-right",
        autoClose: 3000,
      });
      
    } else {
      toast.success("Đăng nhập thành công", {
        position: "top-right",
        autoClose: 3000,
      });
      if (userRole === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Đăng Nhập</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                  <Button type="link" onClick={() => setIsModalOpen(true) }>Quên mật khẩu ?</Button>
                </div>
              </Form.Item>
            </Form>
            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản?{" "}
              <Link href={"/auths/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalChangePass
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Login;
