import Heading from "@/components/Heading";
import {
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  MenuProps,
  Select,
  Table,
  Tabs,
  TabsProps,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Data from "../../dummy/data";
import UpdDownAarrow from "/arrow-3.png";

export default function Subscription() {
  // const [filter, setFilter] = useState("All");
  const [currentTab, setCurrentTab] = useState("1");

  const MenuList = (props: { img: any; title: string; id: string }) => {
    return (
      <div key={props.id} className="w-full space-x-[10px] flex items-center">
        <img src={props.img} alt="" />
        <span>{props.title}</span>
      </div>
    );
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <MenuList img={UpdDownAarrow} title={"Upgrade/Downgrade"} id={"1"} />
      ),
    },
    {
      key: "2",
      label: (
        <MenuList img={UpdDownAarrow} title={"Upgrade/Downgrade"} id={"2"} />
      ),
    },
    {
      key: "3",
      label: (
        <MenuList img={UpdDownAarrow} title={"Upgrade/Downgrade"} id={"3"} />
      ),
    },
  ];

  const Count = (props: { title: string; count: number; id: string }) => {
    return (
      <div className="flex items-center gap-2 font-semibold">
        <p className={twMerge("", currentTab === props.id && "")}>
          {props.title}{" "}
        </p>
        <div
          className={twMerge(
            "bg-off_white text-light_gray flex items-center justify-center rounded-[2px] h-5 w-5 text-[10px] font-semibold",
            currentTab === props.id && "bg-primary_color text-white "
          )}
        >
          {props.count}
        </div>
      </div>
    );
  };

  // const FilterState = [
  //   { label: "All", count: 20 },
  //   { label: "Active", count: 20 },
  //   { label: "Deactivated", count: 20 },
  //   { label: "Expiring soon", count: 20 },
  // ];

  const column = [
    {
      title: <Checkbox />,
      width: 20,
      render: () => <Checkbox />,
    },
    {
      title: "Service",
      dataIndex: "serviceName, ServiceID",
      render: (_text: string, record: any) => (
        <div>
          <p className="table-text w-[150px] truncate">{record.serviceName}</p>
          <span className="text-[#0A95CCB2] text-[11px]">
            {record.ServiceID}
          </span>
        </div>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customerNameCustomerComapny",
      render: (_text: string, record: any) => (
        <div>
          <p className="table-text w-[150px] truncate">{record.customerName}</p>
          <span className="text-[#0A95CCB2] text-[11px]">
            {record.CustomerComapny}
          </span>
        </div>
      ),
    },
    {
      title: "Period",
      dataIndex: "startDate,endDate",
      render: (_text: string, record: any) => (
        <div>
          <p className="table-text w-[150px] text-wrap">{`${record.startDate} to ${record.endDate}`}</p>
        </div>
      ),
    },
    {
      title: "Billing Cycle",
      dataIndex: "cycle",
      render: (text: string, _record: string) => (
        <div>
          <p className="table-text w-[150px] truncate">{text}</p>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text: string, _record: string) => (
        <div>
          <p className="table-text w-[150px] truncate">{text}</p>
        </div>
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "statusStatusDescription",
    //   render: (
    //     _: any,
    //     record: { status: string; statusDescription: string }
    //   ) => (
    //     <div className="">
    //       <StatusTag status={record?.status} />
    //       <p className="text-[#0A95CCB2] text-[11px]">
    //         {record?.statusDescription}
    //       </p>
    //     </div>
    //   ),
    // },
    {
      title: "",
      render: () => (
        <Dropdown menu={{ items }}>
          <Button
            type="default"
            className="flex items-center space-x-1 font-semibold btnColor"
          >
            <span>Action</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: <Count title={"All"} count={22} id={"1"} />,
    },
    {
      key: "2",
      label: <Count title={"Active"} count={33} id={"2"} />,
    },
    {
      key: "3",
      label: <Count title={"Deactivated"} count={48} id={"3"} />,
    },
    {
      key: "4",
      label: <Count title={"Expiring"} count={7} id={"4"} />,
    },
  ];

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <div className="space-y-[px] body-pad">
      <section className="flex justify-between mb-[16px]">
        <Heading heading="Subscription" />
        <div className="justify-end space-x-[16px] flex">
          <Input
            prefix={<SearchOutlined className="text-[#777777]" />}
            placeholder="Search"
          />
          <Select placeholder="Customer" />
          <Select placeholder="Customer" />
          <Button type="default" className="flex items-center space-x-1">
            <span className="btn-span">Refresh</span>
            <SyncOutlined />
          </Button>
          <Link to="/add-sub">
            <Button type="primary">
              <span className="btn-span">New Subscription</span>
              <PlusOutlined className="text-white" />
            </Button>
          </Link>
        </div>
      </section>
      <section className="">
        <div className="">
          {/* {FilterState.map((list) => (
            <div className="flex items-center mb-2 space-x-3">
              <p className="text-[13px]">{list.label}</p>
              <p className="py-[2px] px-[4px] bg-[#F0F1F3] text-[10px] items-center">
                {list.count}
              </p>
            </div>
          ))} */}
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            onChange={handleTabChange}
          />
        </div>
      </section>
      <section className="rounded-lg border-[1.5px]  border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <Table
          scroll={{ x: 800 }}
          size="small"
          columns={column as any}
          dataSource={Data}
        />
      </section>
    </div>
  );
}
