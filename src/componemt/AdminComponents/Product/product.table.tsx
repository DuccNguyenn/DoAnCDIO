"use client";
import { Button, Popconfirm, Table } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductCreate from "./product.create";
import { handleDeleteProductAction } from "@/utils/action";
import ProductUpdate from "./product.update";

interface IProp {
  products: any[];
  meta: {
    total: number;
    pageSize: number;
    page: number;
    current: number;
  };
}
const ProductTable =  (props: IProp) => {
  const { products, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDataUpdate, setIsDataUpdate] = useState<any>(null);
  const [isCategoris, setIsCategoris] = useState<any>([]);

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
      title: "Image",
      render: (text: any, record: any, index: any) => {
        return <img src={record?.image} alt="" width={100} height={100} />;
      },
    },

    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Categori",
      dataIndex: "categori",
      render: (text: any, record: any, index: any) => {
        return <>{record?.categori?.name}</>;
      },
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
              onConfirm={async () => {
                await handleDeleteProductAction(record?._id);
              }
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
          Create Product
        </Button>
      </div>
      <Table
        bordered
        dataSource={products}
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

      <ProductCreate
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
      />
      <ProductUpdate
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        dataUpdate={isDataUpdate}
        setDataUpdate={setIsDataUpdate}
      />
    </>
  );
};

export default ProductTable;
