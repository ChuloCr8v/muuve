import { PlusOutlined, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { Link } from "react-router-dom";

type Props = {};

const SubscriptionFilter = (props: Props) => {
  return (
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
  );
};

export default SubscriptionFilter;
