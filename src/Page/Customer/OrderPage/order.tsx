"use client";
import { Button, Popconfirm, Space, Table, TableProps } from "antd";
import React from "react";
import "./order.scss";
import { handleCancleOrderAction } from "@/utils/action";
import { changeCurrencyVnd } from "@/utils/helper";
interface DataType {
  key: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  status: string;
  total: number;
}
interface OrderItem {
  product: {
    _id: string;
    image: string;
    name: string;
    price: number;
  };
  quantity: number;
  status: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
}

interface OrderData {
  _id: string;
  user: User;
  items: OrderItem[];
}

interface IProps {
  orders: {
    statusCode: number;
    message: string;
    data: OrderData[];
  };
}
const OrderPage = (props: IProps) => {
  const { orders } = props;
  console.log(orders);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: " Ảnh",
      dataIndex: "image",
      align: "center",
      render: (image: string) => (
        <img
          src={image}
          alt="Ảnh Sản Phẩm"
          height={100}
          width={100}
          style={{ objectFit: "contain" }}
        />
      ),
    },
    {
      title: "Sản Phẩm",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Đơn Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text: any, record: any, index: any) => {
        return (
          <Popconfirm
            placement="leftTop"
            onConfirm={() => handleCancleOrderAction(record._id)}
            title={"Xác nhận hủy đơn hàng ?"}
            description={"Bạn có chắc chắn muốn đơn hàng này không ?"}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Space size="middle">
              <span style={{ cursor: "pointer" }}>
                <Button type="primary" danger>
                  Huỷ đơn
                </Button>
              </span>
            </Space>
          </Popconfirm>
        );
      },
    },
  ];
  let dataSource: DataType[] = [];
  if (orders?.data && Array.isArray(orders.data)) {
    dataSource = orders.data.flatMap((order) => {
      return order.items.map((item) => ({
        key: `${order._id}-${item.product._id}`,
        _id: order._id,
        image: item.product.image,
        name: item.product.name,
        quantity: item.quantity,
        price: changeCurrencyVnd(item.product.price),
        status: item.status,
        total:  changeCurrencyVnd(item.product.price * item.quantity),
      }));
    });
  }
  return (
    <>
      <div className="order-container">
        <div className="order-title">
          <h1 style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "rgb(234 27 37)",
              marginTop: "50px",
              marginBottom: "50px",
              marginLeft: "450px",
            }}>Đơn Hàng</h1>
        </div>
        <div className="order-table">
          <Table<DataType>
            columns={columns}
            dataSource={dataSource}
            style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
