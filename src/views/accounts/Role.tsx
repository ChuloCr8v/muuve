import { Button, Dropdown, MenuProps, Tabs, TabsProps } from "antd";
import { FaChevronDown } from "react-icons/fa";
import Heading from "../../component/Global/Header";
import ProjectManagementRoleSettings from "./ProjectManagementRoleSettings";
import NewRoleModal from "./NewRoleModal";
import { useDispatch } from "react-redux";
import { openNewRoleModal } from "../../redux/popupSlice";
import AccountLayout from "./AccountLayout";

const Role = () => {
  const dispatch = useDispatch();

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Project Management",
      children: <ProjectManagementRoleSettings />,
    },
    {
      key: "2",
      label: "Billing System",
      children: <ProjectManagementRoleSettings />,
    },
    {
      key: "3",
      label: "Incident Management",
      children: <ProjectManagementRoleSettings />,
    },
    {
      key: "4",
      label: "Vendor Management",
      children: <ProjectManagementRoleSettings />,
    },
    {
      key: "5",
      label: "Inventory System",
      children: <ProjectManagementRoleSettings />,
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>Project Management</p>,
      onClick: () =>
        dispatch(openNewRoleModal({ module: "project management" })),
    },
    {
      key: "2",
      label: <p>Billing System</p>,
      onClick: () => dispatch(openNewRoleModal({ module: "billing system" })),
    },
    {
      key: "3",
      label: <p>Incident Management</p>,
      onClick: () =>
        dispatch(openNewRoleModal({ module: "incident management" })),
    },
    {
      key: "4",
      label: <p>Vendor Management</p>,
      onClick: () =>
        dispatch(openNewRoleModal({ module: "vendor management" })),
    },
    {
      key: "5",
      label: <p>Inventory System</p>,
      onClick: () => dispatch(openNewRoleModal({ module: "inventory system" })),
    },
  ];

  return (
    <AccountLayout>
      <div className="bg-white h-fit p-4 border rounded-md">
        <div className="flex items-center justify-between">
          <Heading heading="Role Management" />
          <Dropdown menu={{ items }} placement="bottom">
            <Button type="primary" className="">
              New Role
              <FaChevronDown />
            </Button>
          </Dropdown>
        </div>
        <Tabs items={tabItems} />

        <NewRoleModal />
      </div>
    </AccountLayout>
  );
};

export default Role;
