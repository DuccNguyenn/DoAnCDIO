import React from "react";

import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { useEffect } from "react";
import { handleUpdateUserAction } from "@/utils/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  isUpdateOpen: boolean;
  setIsUpdateOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}
const UserUpdate = (props: IProps) => {
  const { isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate?.name,
        email: dataUpdate?.email,
        phone: dataUpdate?.phone,
        address: dataUpdate?.address,
      });
    }
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const { name, phone, address } = values;
      const res = await handleUpdateUserAction({
        _id: dataUpdate?._id,
        name,
        phone,
        address,
      });
      if (res?.data) {
        handleCloseUpdateModal();
        toast.success("Update user success!");
      } else {
        message.error("Update user failed!");
      }
    }
  };

  return (
    <>
      <Modal
        title="Update a user"
        open={isUpdateOpen}
        onOk={() => form.submit()}
        onCancel={() => handleCloseUpdateModal()}
        maskClosable={false}
      >
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[15, 15]}>
            <Col span={24} md={12}>
              <Form.Item label="Email" name="email">
                <Input type="email" disabled />
              </Form.Item>
            </Col>

            <Col span={24} md={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24} md={12}>
              <Form.Item label="Address" name="address">
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
export default UserUpdate;
