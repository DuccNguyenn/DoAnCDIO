

export const changeCurrencyVnd = (price: any )=> {
    return price.toLocaleString('vi-VN', {
      style: "currency",
      currency: "VND"
    })
  }