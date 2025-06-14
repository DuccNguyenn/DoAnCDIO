import { hanldeCreateCategoriAction } from "@/utils/action";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";

interface IProps {
  isCreateOpen: boolean;
  setIsCreateOpen: (isOpen: boolean) => void;
}

const CategoriCreate = (props: IProps) => {
  const { isCreateOpen, setIsCreateOpen } = props;
  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateOpen(false);
  };
  const onFinish = async (values: any) => {
    const res = await hanldeCreateCategoriAction(values);
    if (res?.data) {
      handleCloseCreateModal();
      toast.success("Create categori success!");
    } else {
      toast.error("Create categori failed!/ Please check name!");
    }
  };
  return (
    <>
      <Modal
        title="Add new categori"
        open={isCreateOpen}
        onOk={() => form.submit()}
        onCancel={() => handleCloseCreateModal()}
        maskClosable={false}
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[15, 15]}>
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

      
    </>
  );
};

export default CategoriCreate;
