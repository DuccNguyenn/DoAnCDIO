"use client";

import { useHasMounted } from "@/utils/customHook";
import { Modal, Button, Form, Input } from "antd";
import { useState } from "react";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { sendRequest } from "@/utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalChangePass = (props: any) => {
  const { isModalOpen, setIsModalOpen } = props;
  const hasMouted = useHasMounted();
  const [current, setCurrent] = useState(0);
  const [isEmail, setIsEmail] = useState("");
  const [form] = Form.useForm();
  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BE_URL}/auths/rety-pass`,
      method: "POST",
      body: {
        email,
      },
    });
    if (res?.data) {
      setIsEmail(res?.data?.email);
      setCurrent(1);
    } else {
      toast.error("Email không hợp lệ", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const onFinishStep1 = async (values: any) => {
    const { code, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BE_URL}/auths/change-pass`,
      method: "POST",
      body: {
        code,
        password,
        confirmPassword,
        email: isEmail,
      },
    });
    if (res?.data) {
      setCurrent(2);
      toast.success("Đổi mật khẩu thành công", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const resetModal = () => {
    setCurrent(0);
    setIsModalOpen(false);
    form.resetFields();
  };
  if (!hasMouted) return <></>;

  return (
    <>
      <Modal
        title="Change Password"
        open={isModalOpen}
        onOk={resetModal}
        onCancel={resetModal}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: "Email",
              //   status: "finish",
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              //   status: "finish",
              icon: <SolutionOutlined />,
            },
            {
              title: "Done",
              // status: "wait",
              icon: <SmileOutlined />,
            },
          ]}
        />
        {current === 0 && (
          <>
            <div>
              <p style={{ margin: "20px 0" }}>
                Để thực hiện thay đổi mật khẩu, vui lòng nhập email tài khoản
                của bạn
              </p>
            </div>
            <Form
              name="change-password"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
              // form={form}
            >
              <Form.Item label="" name="email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Gửi mã xác nhận
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {current === 1 && (
          <>
            <div style={{ margin: "20px 0" }}>
              <p>Vui lòng thực hiện đổi mật khẩu</p>
            </div>

            <Form
              name="change-pass-2"
              onFinish={onFinishStep1}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {current === 2 && (
          <p style={{ textAlign: "center" , margin: "20px 0"}}>
            Ban đã đổi mật khẩu thành công. Vui lòng quay lại trang đăng nhập
          </p>
        )}
      </Modal>
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
export default ModalChangePass;
