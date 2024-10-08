import { PlusOutlined, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { Link } from "react-router-dom";
import Heading from "../../../component/Global/Header";
import dataList from "./data";
import useSubscriptionTableColumns from "../../../hooks/billing/useSubscriptionTableColumns";
import TableComponent from "../../../component/Global/TableComponent";

export default function Subscription() {
  const { subscriptionColumns } = useSubscriptionTableColumns();

  return (
    <div className="p-4 body-pad">
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
          <Link to="/billing/add-sub">
            <Button type="primary">
              <span className="btn-span">New Subscription</span>
              <PlusOutlined className="text-white" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="rounded-lg border-[1.5px]  border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <TableComponent columns={subscriptionColumns} dataSource={dataList} />
      </section>
    </div>
  );
}
