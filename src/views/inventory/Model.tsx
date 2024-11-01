import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps, Select } from "antd";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { useListModelQuery } from "../../api/model.api";
import { DeviceStatus, Model } from "../../api/types";
import ActionPopup from "../../components/global/ActionPopup";
import Header from "../../components/global/Header";
import StatusTag from "../../components/global/StatusTag";
import TableComponent from "../../components/global/TableComponent";
import { usePopup } from "../../context/PopupContext";
import { AddModelDrawer } from "../../drawers/inventory/AddModelDrawer";
import Danger from "/dangerSvg.svg";
import { EditModelDrawer } from "../../drawers/inventory/EditModelDrawer";
import { ModelDetailDrawer } from "../../drawers/inventory/ModelDetailDrawer";

export default function InventoryModel() {
  const { openDrawer } = usePopup();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const listModels = useListModelQuery();
  const models = listModels.data ?? [];

  // const summaryCard = [
  //   {
  //     label: "Total",
  //     value: 22,
  //     icon: <OrderedListOutlined />,
  //   },
  //   {
  //     label: "Low on Stock",
  //     value: 19,
  //     icon: <VscVmActive />,
  //   },
  //   {
  //     label: "Out of Stock",
  //     value: 2,
  //     icon: <FaBan />,
  //   },
  // ];

  const actions = (model: Model): MenuProps["items"] => [
    {
      key: "2",
      label: "Edit Details",
      icon: <CiEdit />,
      onClick: () => openDrawer(<EditModelDrawer model={model} />),
    },
  ];

  const columns: ColumnType<Model>[] = [
    {
      title: "Model Number",
      dataIndex: "number",
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
      title: "Total Stock",
      dataIndex: "devices",
      render: (devices) => <span>{devices.length}</span>,
    },
    {
      title: "Availability",
      dataIndex: "faulty",
      render: (_, { devices }) => {
        const availableDevices = devices.filter(
          (d) => d.status === DeviceStatus.AVAILABLE
        ).length;
        if (availableDevices > 1 && availableDevices < 10) {
          return (
            <StatusTag
              status="Low In Stock"
              bgColor="#FDF7DD"
              textColor="#B9A325"
            />
          );
        }

        if (availableDevices > 10) {
          return (
            <StatusTag
              status="In Stock"
              textColor="#379D51"
              bgColor="#E3FFE6"
            />
          );
        }

        return (
          <StatusTag
            status="Out Of Stock"
            textColor="#F05050"
            bgColor="#FFE1E1"
          />
        );
      },
    },
    {
      title: "",
      render: (_, record: any) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: actions(record),
            }}
          >
            <Button size="small" className="px-4 text-grey">
              Action
              <IoMdArrowDropdown />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-[16px] p-8">
      <div className="flex items-center justify-between">
        <Header heading={"Device Model"} />

        <section className="flex items-center gap-[16px]">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />
          <Select placeholder="Category" />

          <Button>Refresh</Button>

          <Button
            onClick={() => openDrawer(<AddModelDrawer />)}
            className="flex items-center spacex-2"
            type="primary"
          >
            <span>New Model</span>
            <PlusOutlined />
          </Button>
        </section>
      </div>

      {/* <SummaryCards summaryData={summaryCard} /> */}

      <TableComponent<Model>
        columns={columns}
        dataSource={models}
        scroll={800}
        loading={listModels.isLoading}
        onRow={(model) => {
          openDrawer(<ModelDetailDrawer model={model} />);
        }}
      />

      <ActionPopup
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title="Action Required"
        sendButtonText="Send"
        icon={Danger}
        sendButtonStyle="bg-red-600"
      >
        <p>Are you sure you want to proceed with this action?</p>
      </ActionPopup>
    </div>
  );
}
