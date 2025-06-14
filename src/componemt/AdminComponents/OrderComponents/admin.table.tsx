"use client";
import {
  handleCancleOrderAction,
  handleConfirmOrderAction,
} from "@/utils/action";
import { Button, Space, TableProps } from "antd";
import { Table } from "antd";
import Image from "next/image";
import { title } from "process";
import React, { useState } from "react";
interface DataType {
  key: string;
  _id: string;
  name: string;
  email: string;
  image: string;
  nameproduct: string;
  quantity: number;
  price: number;
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

const OrderTable = (props: IProps) => {
  const { orders } = props;
  console.log("Raw orders:", orders);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "_id",
      align: "center",
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Ảnh Sản Phẩm",
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
      dataIndex: "nameproduct",
      align: "center",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "center",
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      align: "center",
      render: (total: number) => `${total.toLocaleString()} VNĐ`,
    },
    {
      title: "Action",
      align: "center",
      render: (text: any, record: any, index: any) => {
        return (
          <>
            <Space>
              <Button
                type="primary"
                color="green"
                onClick={() => handleConfirmOrderAction(record._id)}
              >
                Duyệt
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleCancleOrderAction(record._id)}
              >
                Cancle
              </Button>
            </Space>
          </>
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
        name: order.user.name,
        email: order.user.email,
        image: item.product.image,
        nameproduct: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        status: item.status,
        total: item.product.price * item.quantity,
      }));
    });
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Manager Order</span>
      </div>
      <Table
        style={{ width: "100%", textAlign: "center" }}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
      />
    </>
  );
};

export default OrderTable;
