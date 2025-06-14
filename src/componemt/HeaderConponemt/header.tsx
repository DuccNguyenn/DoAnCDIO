"use client";
import React, { useState } from "react";
import "./header.scss";
import Link from "next/link";
import Logo from "@/img/logo.png";
import Like from "@/img/icon _heart_.png";
import Cart from "@/img/cart.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { AutoComplete, Dropdown } from "antd";
import {
  DownOutlined,
  ShoppingCartOutlined,
  ShoppingFilled,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
import { changeCurrencyVnd } from "@/utils/helper";

const Header = () => {
  const { data: session } = useSession();
  const [searchValues, setSearchValues] = useState<any>("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const router = useRouter();

  const handleSearch = async (values: string) => {
    setSearchValues(values);
    if (values.trim()) {
      const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BE_URL}/products`,
        method: "GET",
        queryParams: {
          search: values.trim(),
        },
      });
      setSearchResult(res?.data?.result || []);
    } else {
      setSearchResult([]);
    }
  };

  const options = searchResult.map((product) => ({
    value: product.name,
    label: (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
          <div>
            <div style={{ fontWeight: "bold"}}>{product.name}</div>
            <div style={{ color: "#e94560" }}>{changeCurrencyVnd(product.price)}</div>
          </div>
        </div>
      </>
    ),
    key: product._id,
  }));

  const handleSelect = (values: string, option: any) => {
    router.push(`/detail/${option.key}`);
  };

  // Define the dropdown menu items
  const menuItems = session?.user.email
    ? [
        {
          key: "logout",
          label: (
            <span onClick={() => signOut({ callbackUrl: "/" })}>Logout</span>
          ),
          danger: true,
        },
      ]
    : [
        {
          key: "login",
          label: (
            <Link
              href="/auths/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          ),
        },
      ];

  return (
    <div className="header">
      <Link href={"/"}>
        <Image className="logo" src={Logo} alt="Logo" />
      </Link>
      <ul className="headers-links">
        <li>
          <Link href={"/"} style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/shop"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            style={{ textDecoration: "none", color: "black" }}
          >
            About
          </Link>
        </li>
        <li>
          <AutoComplete
            className="nav-search"
            onSearch={handleSearch}
            value={searchValues}
            options={options}
            onSelect={handleSelect}
            placeholder="Search products..."
            style={{ width: "200px" }}
          />
        </li>
        <li>
          <Link href={"/order"}>
            <ShoppingOutlined style={{ color: "black", fontSize: "25px" }} />
          </Link>
        </li>
        <li>
          <Link href={"/cart"}>
            <ShoppingCartOutlined
              style={{ color: "black", fontSize: "25px" }}
            />
          </Link>
        </li>
        <li>
          {session?.user.email ? (
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <a
                className="header-login ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ cursor: "pointer" }}
              >
                {session?.user?.email} <DownOutlined />
              </a>
            </Dropdown>
          ) : (
            <Link className="header-login" href={"/auths/login"}>
              Login
            </Link>
          )}
        </li>
        {!session?.user.email && (
          <li>
            <Link className="header-register" href={"/auths/register"}>
              Sign Up
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
