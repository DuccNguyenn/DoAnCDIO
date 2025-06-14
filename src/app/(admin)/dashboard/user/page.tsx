import { auth } from "@/auth";
import UserTable from "@/componemt/AdminComponents/User/admin.table";
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
const ManagerUserPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BE_URL}/users`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-users"] },
    },
  });
  return (
    <>
      <UserTable users={res?.data?.result ?? []} meta={res?.data?.meta} />
    </>           
  );
};

export default ManagerUserPage;
