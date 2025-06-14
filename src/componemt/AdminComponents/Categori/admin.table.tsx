"use client";
import React, { useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoriCreate from "./admin.create";
import CategoriUpdate from "./admin.update";
import { handleDeleteCategoriAction } from "@/utils/action";

interface IProp {
  categoris: any[];
  meta: {
    total: number;
    pageSize: number;
    page: number;
    current: number;
  };
}
const CategoriTable = (props: IProp) => {
  const { categoris, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDataUpdate, setIsDataUpdate] = useState<any>(null);

  const columns = [
    {
      title: "STT",
      render: (_: any, record: any, index: any) => {
        return <>{index + 1 + (meta.current - 1) * meta.pageSize}</>;
      },
    },
    {
      title: "_id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      render: (text: any, record: any, index: any) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={() => {
                setIsUpdateOpen(true);
                setIsDataUpdate(record);
              }}
            ></EditTwoTone>

            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa categori"}
              description={"Bạn có chắc chắn muốn xóa categori này ?"}
              onConfirm={async () =>
                await handleDeleteCategoriAction(record?._id)
              }
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("current", pagination.current);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Manager Categoris</span>
        <Button
          onClick={() => {
            setIsCreateOpen(true);
          }}
        >
          Create Categori
        </Button>
      </div>
      <Table
        bordered
        dataSource={categoris}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          current: meta?.current,
          pageSize: meta?.pageSize,
          showSizeChanger: true,
          total: meta?.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      <CategoriCreate
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
      />
      <CategoriUpdate
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        dataUpdate={isDataUpdate}
        setDataUpdate={setIsDataUpdate}
      />
    </>
  );
};

export default CategoriTable;
