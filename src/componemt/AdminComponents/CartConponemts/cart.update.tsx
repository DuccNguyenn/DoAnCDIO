import { auth } from "@/auth";
import { Col, Form, Input, Modal, Row, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";
import { handleUpdateUserAction } from "@/utils/action";
import { toast } from "react-toastify";

interface IProps {
  isOpenCreate: boolean;
  setIsOpenCreate: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

const UpdateCart = (props: IProps) => {
  const { isOpenCreate, setIsOpenCreate, dataUpdate, setDataUpdate } = props;
  const [form] = useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
      });
    }
  }, [dataUpdate, form]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsOpenCreate(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: any) => {
    try {
      const res = await handleUpdateUserAction({
        _id: dataUpdate?._id,
        ...values,
      });

      if (res.statusCode === 200) {
        toast.success("Cập nhật thông tin thành công!");
        handleCloseUpdateModal();
      } else {
        toast.error("Cập nhật thông tin thất bại!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  return (
    <>
      <Modal
        title="Cập nhật thông tin"
        open={isOpenCreate}
        onOk={() => form.submit()}
        onCancel={() => handleCloseUpdateModal()}
        maskClosable={false}
      >
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[15, 15]}>
            <Col span={24} md={12}>
              <Form.Item
                label="Tên"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên của bạn!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24} md={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
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

export default UpdateCart;
