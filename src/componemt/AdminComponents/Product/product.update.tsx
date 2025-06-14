import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
  Select,
  Upload,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  getCategoriList,
  handleUpdateCategoriAction,
  handleUpdateProductAction,
} from "@/utils/action";

interface IProps {
  isUpdateOpen: boolean;
  setIsUpdateOpen: (isOpen: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

const ProductUpdate = (props: IProps) => {
  const { isUpdateOpen, setIsUpdateOpen, dataUpdate, setDataUpdate } = props;
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const fetchCategories = async () => {
    const res = await getCategoriList();
    const categoryList = res?.data?.result || []; // <-- Sửa tại đây
    setCategories(categoryList);
  };
  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate?.name,
        price: dataUpdate?.price,
        categori: dataUpdate?.categori,
        description: dataUpdate?.description,
        quantity: dataUpdate?.quantity,
      });
    }
  }, [dataUpdate]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateOpen(false);
  };
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      if (!file) {
        toast.error("Please upload image!");
      }

      const formData = new FormData();
      formData.append("_id", dataUpdate?._id);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("categori", values.categori);
      formData.append("description", values.description);
      formData.append("image", file as File);
      formData.append("quantity", values.quantity);
      console.log(dataUpdate?._id);
      if (dataUpdate) {
        const res = await handleUpdateProductAction({
          _id: dataUpdate?._id,
          formData,
        });
        if (res.statusCode) {
          console.log(res);
          handleCloseUpdateModal();
        }
        else {
          console.log("Không thành công");
        }
      }
    } catch (error) {}
  };
  return (
    <>
      <Modal
        title="Add new categori"
        open={isUpdateOpen}
        onOk={() => form.submit()}
        onCancel={() => handleCloseUpdateModal()}
        maskClosable={false}
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[15, 15]}>
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
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input your price!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24} md={12}>
              <Form.Item
                label="Categori"
                name="categori"
                rules={[
                  { required: true, message: "Please input your categori!" },
                ]}
              >
                <Select placeholder="Select a category">
                  {categories?.map((cat: any) => (
                    <Select.Option key={cat._id} value={cat._id}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24} md={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ message: "Please input your description!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24} md={12}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ message: "Please input your quantity!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Product Image" name="image">
                <Upload
                  name="image"
                  listType="picture"
                  maxCount={1}
                  beforeUpload={(file) => {
                    setFile(file);
                    return false; // Set the file name to state
                  }} // prevent auto upload
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ProductUpdate;
