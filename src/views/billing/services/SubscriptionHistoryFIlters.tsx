import {
  SearchOutlined,
  SyncOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Input, Select, Button } from "antd";
import { customerData } from "../../../dummy/customerData";
import { billingCycle } from "../../../utils/billingCycle";

const SubscriptionHistoryFIlters = () => {
  return (
    <div className="justify-end space-x-3 flex">
      <Input
        prefix={<SearchOutlined className="text-[#777777]" />}
        placeholder="Search"
      />
      <Select
        placeholder="Customer"
        dropdownStyle={{ maxWidth: 200, width: "100%" }}
        options={customerData.map((item) => ({
          label: item.customerName,
          value: item.id,
        }))}
      />
      <Select
        placeholder="Cycle"
        dropdownStyle={{ maxWidth: 120, width: "100%" }}
        options={billingCycle.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
      />
      <Button
        className="flex items-center space-x-1 border-gray-300 text-gray-500"
        icon=<SyncOutlined />
        iconPosition="end"
      >
        <span className="btn-span">Refresh</span>
      </Button>
      <Button
        className="flex items-center space-x-1 border-gray-300 text-gray-500"
        icon=<DownloadOutlined />
        iconPosition="end"
      >
        <span className="btn-span">Generate Report</span>
      </Button>
    </div>
  );
};

export default SubscriptionHistoryFIlters;
