import { Button, Checkbox, Dropdown, MenuProps, Tag } from "antd";
import TableComponent from "../../global/TableComponent";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import ModelData from "../data/ModelData";
import { useState } from "react";
import ModelDetails from "../../inventory/model/ModelDetails";

interface Prop {
  selectedRow: any;
  setSelectedRow: any;
  setNewModel: any;
  data: any
}

export default function ModelTable(props: Prop) {
  const { selectedRow, setSelectedRow, setNewModel, data } = props;

  const [modelDetails, setModelDetails] = useState(false);

  const handleRowClick = (record: any) => {
    setSelectedRow(record);
    setModelDetails(true);
  };

  const HandleEdit = (record: any) => {
    setSelectedRow(record);
    setNewModel(true);
  };

  const items = (record: any): MenuProps["items"] => [
    {
      key: "1",
      label: "View Details",
      icon: <EditOutlined />,
      onClick: () => handleRowClick(record),
    },
    {
      key: "2",
      label: "Edit Model",
      icon: <EyeOutlined />,
      onClick: () => HandleEdit(record),
    },
  ];

  const column = [
    {
      title: "Model Number",
      dataIndex: "number",
      render: (text: string) => <span>{`MD-${text.substring(0,5)}`}</span>
    },
    {
      title: "Model",
      dataIndex: "name",
      //  width: 250,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
    },
    {
      title: "Number Available",
      dataIndex: "available",
    },
    {
      title: "Number Faulty",
      dataIndex: "faulty",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (text: string) => (
    //     <Tag
    //       icon={
    //         text === "LOW-ON-STOCK" ? (
    //           <ExclamationCircleOutlined />
    //         ) : text === "OUT-OF-STOCK" ? (
    //           <CloseCircleOutlined />
    //         ) : (
    //           <CheckCircleOutlined />
    //         )
    //       }
    //       className={twMerge(
    //         "rounded-2xl tagSize font-semibold items-center",
    //         text === "IN-STOCK"
    //           ? "bg-[#E3FFE6] text-[#379D51] border-[#379D51]"
    //           : text === "OUT-OF-STOCK"
    //           ? "bg-[#FFE1E1] text-[#F05050] border-[#F05050]"
    //           : "bg-[#FDF7DD] text-[#B9A325] border-[#B9A325]"
    //       )}
    //     >
    //       {text}
    //     </Tag>
    //   ),
    // },
    {
      title: "",
      render: (record: any) => (
        <Dropdown menu={{ items: items(record) }}>
          <Button className="tableAction">
            <span>Action</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];
  return (
    <div>
      <TableComponent columns={column} dataSource={data} />

      <ModelDetails
        modelDetails={modelDetails}
        setModelDetails={setModelDetails}
        selectedRow={selectedRow}
      />
    </div>
  );
}
