import { sendRequest } from "@/utils/api";
import { auth } from "@/auth";
import ProductTable from "@/componemt/AdminComponents/Product/product.table";
interface IProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ManagerProduct = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BE_URL}/products`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-products"] },
    },
  });
  return (
    <>
      <ProductTable products={res?.data?.result ?? []} meta={res?.data?.meta} />
    </>
  );
};

export default ManagerProduct;
