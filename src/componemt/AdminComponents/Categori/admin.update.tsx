import React from "react";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { useEffect } from "react";
import { handleUpdateCategoriAction, handleUpdateUserAction } from "@/utils/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  isUpdateOpen: boolean;
  setIsUpdateOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}
const CategoriUpdate = (props: IProps) => {
  const { isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate?.name,
        Description: dataUpdate?.Description,
      });
    }
  }, [dataUpdate]);


  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: any) => {
    console.log(dataUpdate?._id,);
    const { name } = values;
    console.log(name);
    if (dataUpdate) {
      const res = await handleUpdateCategoriAction({
        _id: dataUpdate?._id,
        name,
      });
      
      if (res?.data) {
        await handleCloseUpdateModal();
        toast.success("Update categori success!");
      } else {
        toast.error("Update categori failed!");
      }
    }
  };
  return (
    <>
      <Modal
        title="Update a categori"
        open={isUpdateOpen}
        onOk={() => form.submit()}
        onCancel={() => handleCloseUpdateModal()}
        maskClosable={false}
      >
        <Form onFinish={onFinish} layout="vertical" form={form}>
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

export default CategoriUpdate;
