import { auth } from "@/auth";
import CategoriTable from "@/componemt/AdminComponents/Categori/admin.table";
import { sendRequest } from "@/utils/api";
import React from "react";

interface IProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ManagerCategori = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BE_URL}/categoris`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-categoris"] },
    },
  });
  return (
    <>
      <CategoriTable
        categoris={res?.data?.result ?? []}
        meta={res?.data?.meta}
      />
    </>
  );
};

export default ManagerCategori;
