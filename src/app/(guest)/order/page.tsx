import { auth } from '@/auth'
import OrderPage from '@/Page/Customer/OrderPage/order'
import { sendRequest } from '@/utils/api'
import React from 'react'



const Order = async () => {
  const session = await auth()
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BE_URL}/order/user/${session?.user?._id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  })
  return (
    <>
      <OrderPage orders={res?.data}/>
    </>
  )
}

export default Order
