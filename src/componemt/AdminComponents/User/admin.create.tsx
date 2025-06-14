import React from "react";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { handleCreateUserAction } from "@/utils/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  isCreateOpen: boolean;
  setIsCreateOpen: (isOpen: boolean) => void;
}

const UserCreate = (poprs: IProps) => {
  const { isCreateOpen, setIsCreateOpen } = poprs;
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const res = await handleCreateUserAction(values);
    if (res?.data) {
      handleCloseCreateModal();
      toast.success("Create user success!");
    } else {
      message.error("Create user failed!");
    }
  };
  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateOpen(false);
  };
  return (
    <>
      <Modal
        title="Add new user"
        open={isCreateOpen}
        onOk={() => form.submit()}
        onCancel={() => handleCloseCreateModal()}
        maskClosable={false}
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default UserCreate;
