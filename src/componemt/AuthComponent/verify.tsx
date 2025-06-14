"use client";
import React from "react";
import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = (props: any) => {
  const router = useRouter();
  const { id } = props;
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const { _id, code } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BE_URL}/auths/check-code`,
      method: "POST",
      body: {
        _id,
        code,
      },
    });
    console.log(res);
    if (res?.data) {
      message.success("Kích hoạt tài khoản thành công")
      router.push("/auths/login");
    } else {
      toast.error(res.error, {
        position: "top-right",
        autoClose: 3000,
      })
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo: any
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
            <legend>Kích Hoạt Tài Khoản</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="ID"
                name="_id"
                initialValue={id}
                hidden
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <div>
                <span>
                  Mã Code đã được gửi vào email đăng kí, vui lòng kiểm tra!
                </span>
              </div>
              <Divider></Divider>
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your code",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Kích Hoạt
                </Button>
              </Form.Item>
            </Form>
            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Đã có tài khoản? <Link href={"/auths/login"}>Đăng nhập</Link>
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
    </>
  );
};
export default Verify;
