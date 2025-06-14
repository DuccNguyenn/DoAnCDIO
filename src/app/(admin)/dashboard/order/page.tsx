import { auth } from "@/auth";
import OrderTable from "@/componemt/AdminComponents/OrderComponents/admin.table";
import { sendRequest } from "@/utils/api";
import React from "react";

const ManagerOrder = async () => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BE_URL}/order`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  console.log("API Response:", res);
  console.log("API Data:", res?.data);
  return (
    <>
      <OrderTable
        orders={
          res?.data || {
            data: {
              _id: "",
              user: { _id: "", name: "", email: "" },
              items: [],
            },
          }
        }
      />
    </>
  );
};

export default ManagerOrder;
