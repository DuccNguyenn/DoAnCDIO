"use client";
import { Card } from "antd";
import { useState } from "react";
import "@/Page/Customer/HomePage/homepage.scss";
import Start from "@/img/start.png";
import Image from "next/image";
import Cart from "@/img/cart.png";
import Heart from "@/img/heart.png";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { changeCurrencyVnd } from "@/utils/helper";

interface ICategory {
  _id: string;
  name: string;
}

interface IProduct {
  _id: string;
  name: string;
  price: number;
  categori: ICategory;
  description: string;
  image: string;
}
interface IProps {
  products: IProduct[];
}
const ListCategori = (props: IProps) => {
  const { products } = props;
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const uniqueCategories = Array.from(
    new Map(
      products.map((item) => [item?.categori?._id, item.categori])
    ).values()
  );
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categori._id === selectedCategory)
    : products;
  return (
    <>
      <div className="list-categori">
        <div className="list-container">
          <div className="list-categori__title">Top Categoris</div>
          <div className="list-categori__items">
            <span
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: "6px 12px",
                backgroundColor:
                  selectedCategory === null ? "#1677ff" : "transparent",
                color: selectedCategory === null ? "white" : "black",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              All
            </span>
            {uniqueCategories.map((cat) => (
              <span
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                style={{
                  padding: "6px 12px",
                  backgroundColor:
                    selectedCategory === cat._id ? "#1677ff" : "transparent",
                  color: selectedCategory === cat._id ? "white" : "black",
                  borderRadius: 6,
                  cursor: "pointer",
                  marginLeft: 8,
                }}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        <div className="list-categori__products-container">
          <div className="list-categori__products">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                onClick={() => router.push(`/detail/${product._id}`)}
                hoverable
                style={{
                  width: "300px",
                  height: "310px",
                  margin: "10px",
                  borderRadius: "10px",
                }}
                cover={
                  <img alt="example" src={product.image} className="item-img" />
                }
              >
                <div className="item-name">{product.name}</div>
                <div className="item-price">{changeCurrencyVnd(product.price)}</div>
                <div className="item-like">
                  <Image src={Start} alt="start" className="like" />
                  <Image src={Heart} alt="heart" className="heart" />
                </div>
                <div className="item-add_cart">
                  <Image src={Cart} alt="cart" className="add_cart" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCategori;
