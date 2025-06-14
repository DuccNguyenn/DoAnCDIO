
import "@/app/(style)/style.scss";
import ListCategori from "@/componemt/ListCategori/listcategori";
import HomePage from "@/Page/Customer/HomePage/homepage";
import { sendRequest } from "@/utils/api";



export default async function Home()  {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BE_URL}/products`,
    method: "GET",
  });
  const products = res?.data?.result || []; 
  return (
    <>
     <HomePage/>
     <ListCategori products = {products} />
    </>
  );
}
