import { auth } from "@/auth";
import CartPage from "@/Page/Customer/CartPage/cart";
import { sendRequest } from "@/utils/api";
import React from "react";

const Cart = async () => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BE_URL}/cart/user/${session?.user?._id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return (
    <>
      <CartPage cart={res?.data} />
    </>
  );
};

export default Cart;
