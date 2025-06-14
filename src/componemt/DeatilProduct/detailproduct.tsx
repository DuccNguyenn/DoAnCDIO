"use client";
import { sendRequest } from "@/utils/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "@/componemt/DeatilProduct/detailproduct.scss";
import { Button, Input, InputNumber, InputNumberProps } from "antd";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { handleBuyProductAction } from "@/utils/action";
import { changeCurrencyVnd } from "@/utils/helper";
const DetailPage = (props: any) => {
  const { id } = props;
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [otherProducts, setOtherProducts] = useState<any>(null);
  const [ispQuantity, setIsQuantity] = useState<any>(1);
  const onChange: InputNumberProps["onChange"] = (value) => {
    setIsQuantity(value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BE_URL}/products/${id}`,
        method: "GET",
      });
      setProduct(res?.data);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchOtherProducts = async () => {
      const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BE_URL}/products`,
        method: "GET",
      });
      setOtherProducts(res?.data);
    };
    fetchOtherProducts();
  }, []);

  const relatedProducts = otherProducts?.result?.filter(
    (item: any) =>
      item.categori?._id === product?.categori?._id && item._id !== product?._id
  );
  const handleAddCart = async () => {
    const session = await getSession();

    const getId = session?.user._id;
    const getIdProduct = product?.id;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BE_URL}/cart`,
      method: "POST",
      body: {
        user: getId,
        items: [
          {
            product: getIdProduct,
            quantity: ispQuantity,
          },
        ],
      },
    });
    if (res?.statusCode === 201) {
      alert("Đã thêm vào giỏ hàng!");
    } else {
      alert("Thêm vào giỏ hàng thất bại");
    }
  };

  const handleBuyProduct = async () => {
    const session = await getSession();
    const getId = session?.user._id;
    const getIdProduct = product?.id;
    const res = await handleBuyProductAction(getId, getIdProduct, ispQuantity);
    if (res?.statusCode === 201) {
      alert("Mua hàng thành công!");
      router.push("/order");
    } else {
      alert("Mua hàng thất bại");
    }
  };

  return (
    <>
      <div className="detail-container">
        {!product ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="detail-product">
              <div className="detail-img">
                <img
                  src={product?.image}
                  alt="Product Image"
                  width={300}
                  height={300}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="detail-content">
                <div className="detail-title">
                  <h1>{product?.name}</h1>
                </div>
                <div className="detail-price">
                  <span>{changeCurrencyVnd(product?.price)}</span>
                </div>
                <div className="detail-quantity">
                  <h3>
                    Số Lượng:{" "}
                    <InputNumber
                      min={1}
                      max={10}
                      value={ispQuantity}
                      onChange={onChange}
                    />
                  </h3>
                </div>

                <div className="detail-addcart">
                  <Button
                    onClick={() => handleAddCart()}
                    type="primary"
                    style={{
                      backgroundColor: "#ffff",
                      borderColor: "#000",
                      color: "#000",
                      width: "300px",
                      padding: "25px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>

                <div className="detail-buy">
                  <Button
                    onClick={() => handleBuyProduct()}
                    type="primary"
                    style={{
                      backgroundColor: "#EA1B25",
                      borderColor: "#000",
                      color: "#ffff",
                      width: "300px",
                      padding: "25px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
            <div className="detail-description">
              <h1>Chi tiết sản phẩm</h1>
              <p>- {product?.description}</p>
            </div>
            <div className="related-products-container">
              <h1>Sản phẩm liên quan</h1>
              <div className="related-products">
                {relatedProducts?.map((item: any) => (
                  <div
                    key={item._id}
                    className="related-product"
                    onClick={() => router.push(`/detail/${item._id}`)}
                  >
                    <img
                      src={item.image}
                      alt="Product Image"
                      style={{
                        objectFit: "contain",
                        width: "auto",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        margin: "40px",
                      }}
                    />
                    <h2>{item.name}</h2>
                    <span>{changeCurrencyVnd(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DetailPage;
