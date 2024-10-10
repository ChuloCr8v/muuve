import { Button, Input, Select } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { billingCycle } from "../../../utils/billingCycle";

type Props = {
  showNewServiceButton?: boolean;
};

const Filters = (props: Props) => {
  const navigate = useNavigate();

  const btnProperties = [
    {
      title: "Refresh",
      icon: <ReloadOutlined />,
    },
    {
      title: "Generate Report",
      icon: <DownloadOutlined />,
    },
    {
      title: "Add",
      icon: <PlusOutlined />,
      handleClick: () => navigate("/billing/services/new-service"),
    },
  ];

  const selectProperties = [
    {
      title: "Cycle",
      options: billingCycle,
    },
    // {
    //   title: "Status",
    //   options: [
    //     { label: "Active", value: "active" },
    //     { label: "Inactive", value: "inactive" },
    //   ],
    // },
  ];

  return (
    <div className="flex items-center gap-2">
      <Input
        className="w-[300px]"
        placeholder="Search"
        prefix={
          <SearchOutlined
            className="mr-2"
            style={{ color: "rgba(0,0,0,.25)" }}
          />
        }
      />
      <div className="flex items-center gap-2">
        {selectProperties.map((select) => (
          <Select
            key={select.title}
            placeholder={select.title}
            options={select.options.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            dropdownStyle={{ width: "100px" }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {btnProperties.map((btn) => (
          <Button
            key={btn.title}
            onClick={btn.handleClick}
            iconPosition="end"
            icon={btn.icon}
            type={btn.title.toLowerCase() === "add" ? "primary" : undefined}
            className={twMerge(
              "border-input_border text-light_gray",
              btn.title.toLowerCase() === "new service" && "text-white",
              btn.title.toLowerCase() === "new service" &&
                !props.showNewServiceButton &&
                "hidden"
            )}
          >
            {btn.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
