"use client";
import {
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  TableProps,
} from "antd";
import React, { useEffect, useState } from "react";
interface DataType {
  key: any;
  name: any;
  price: string;
  quantity: any;
  total: string;
}
import { DeleteTwoTone } from "@ant-design/icons";
import "./cart.scss";
import { GetUserById, hanldeDeleteCartAction } from "@/utils/action";
import { changeCurrencyVnd } from "@/utils/helper";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import UpdateCart from "@/componemt/AdminComponents/CartConponemts/cart.update";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface CartData {
  data: {
    user: string;
    items: CartItem[];
  };
}

interface IProps {
  cart: CartData;
}

const CartPage = (props: IProps) => {
  const { cart } = props;
  const router = useRouter();
  const [cartData, setCartData] = useState<CartData>(cart);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isDataUpdate, setIsDataUpdate] = useState<any>(null);
  const userCart = Array.isArray(cart) ? cart[0] : cart;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (cartData?.data?.user) {
        const res = await GetUserById(cartData.data.user);
        if (res?.data) {
          setUserInfo(res.data);
        }
      }
    };
    fetchUserInfo();
  }, [cartData?.data?.user]);

  const handleDeleteItem = async (userId: string, productId: string) => {
    try {
      await hanldeDeleteCartAction(userId, productId);
      setCartData((prevData) => {
        if (!prevData?.data?.items) return prevData;
        return {
          ...prevData,
          data: {
            ...prevData.data,
            items: prevData.data.items.filter(
              (item) => item.product._id !== productId
            ),
          },
        };
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      // Tạo mảng items cho đơn hàng
      const orderItems = dataSource.map((item: any) => ({
        product: String(item.key),
        quantity: item.quantity,
      }));

      // Gọi API tạo đơn hàng
      const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BE_URL}/order`,
        method: "POST",
        body: {
          user: cartData.data.user,
          items: orderItems,
        },
      });

      if (res?.statusCode === 201) {
        // Xóa tất cả sản phẩm khỏi giỏ hàng
        for (const item of dataSource) {
          await handleDeleteItem(cartData.data.user, item?.key);
        }
        alert("Thanh toán thành công!");
        router.push("/order");
      } else {
        alert("Thanh toán thất bại!");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Có lỗi xảy ra khi thanh toán!");
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Sản Phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any, index: any) => {
        return (
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa sản phẩm"}
            description={"Bạn có chắc chắn muốn xóa sản phẩm này không ?"}
            onConfirm={() => handleDeleteItem(cartData.data.user, record.key)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Space size="middle">
              <span style={{ cursor: "pointer" }}>
                <Button type="primary" danger>
                  Xóa
                </Button>
              </span>
            </Space>
          </Popconfirm>
        );
      },
    },
  ];

  const dataSource =
    cartData?.data?.items?.map((item: CartItem, index: number) => ({
      key: item.product._id || index,
      name: item.product.name,
      price: changeCurrencyVnd(item.product.price),
      quantity: item.quantity,
      total: changeCurrencyVnd(item.product.price * item.quantity),
    })) || [];

  return (
    <>
      <div className="cart-wrapper">
        <div className="cart-container">
          <div className="cart-header">
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "rgb(234 27 37)",
                marginTop: "50px",
                marginBottom: "50px",
                marginLeft: "10px",
              }}
            >
              Giỏ Hàng
            </h1>
          </div>
          <div className="cart-content">
            <Row gutter={[24, 24]}>
              <Col flex="1 1 200px">
                <Table<DataType> columns={columns} dataSource={dataSource} />
              </Col>
              <Col flex="0 1 300px">
                <div className="cart-summary">
                  <div className="total-row">
                    <span className="label">Tổng tiền</span>
                    <span className="value">
                      {changeCurrencyVnd(
                        dataSource.reduce((total: number, item: any) => {
                          const price = parseInt(
                            item.total.replace(/[^0-9]/g, "")
                          );
                          return total + (isNaN(price) ? 0 : price);
                        }, 0)
                      )}
                    </span>
                  </div>
                  <button className="checkout-button" onClick={handleCheckout}>
                    THANH TOÁN
                  </button>
                </div>
              </Col>
            </Row>
          </div>
          <div className="address">
            <Card
              title="Địa Chỉ"
              extra={
                <Button
                  onClick={() => {
                    setIsOpenCreate(true);
                    setIsDataUpdate(userInfo)
                  }}
                >
                  Thêm Địa Chỉ
                </Button>
              }
              variant="borderless"
              style={{ width: "100%", maxWidth: "950px" }}
            >
              <h3>
                Người Nhận Hàng:{" "}
                <span>{userInfo?.name || "Chưa cập nhật"}</span>
              </h3>
              <h3>
                Địa Chỉ: <span>{userInfo?.address || "Chưa cập nhật"}</span>
              </h3>
              <h3>
                Số Điện Thoại: <span>{userInfo?.phone || "Chưa cập nhật"}</span>
              </h3>
            </Card>
          </div>
        </div>
      </div>
      <UpdateCart
        isOpenCreate={isOpenCreate}
        setIsOpenCreate={setIsOpenCreate}
        dataUpdate={isDataUpdate}
        setDataUpdate={setIsDataUpdate}
      />
    </>
  );
};

export default CartPage;
