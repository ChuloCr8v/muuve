import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps } from "antd";
import { ColumnType } from "antd/es/table";
import { FaRegCommentDots } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { TbArrowsExchange } from "react-icons/tb";
import { useListProjectsQuery } from "../../api/project.api";
import { Project, ProjectStage } from "../../api/types";
import DropdownCustomItem from "../../components/global/DropdownCustomItem";
import Header from "../../components/global/Header";
import StatusTag from "../../components/global/StatusTag";
import TableComponent from "../../components/global/TableComponent";
import TableRowData from "../../components/global/TableRowData";
import { usePopup } from "../../context/PopupContext";
import { JobRespondPhaseModal } from "../../modals/projects/JobRespondPhaseModal";
import { formatStatusEnum } from "../../utils/formatEnum";
import { JobUploadAsBuiltModal } from "@/modals/projects/JobUploadAsBuilt";
import JobAtpDetailsDrawer from "@/drawers/projects/JobAtpDetailDrawer";

const ProjectAtp = () => {
  const { openDrawer, openModal } = usePopup();

  const listProjects = useListProjectsQuery({ atp: true });
  const projects = listProjects.data ?? [];

  const summaryData = [
    {
      label: "Total",
      value: 50,
    },
    {
      label: "Active",
      value: 30,
    },
    {
      label: "Deactivated",
      value: 5,
    },
    {
      label: "Expiring",
      value: 25,
    },
  ];

  const actions = (project: Project): MenuProps["items"] => [
    {
      key: 0,
      label: (
        <DropdownCustomItem
          label={"Upload As-Built"}
          icon={<FiUpload />}
          className="text-green-600"
        />
      ),
      onClick: () => openModal(<JobUploadAsBuiltModal project={project} />),
    },
    {
      key: 1,
      label: (
        <DropdownCustomItem
          label={"Resend As-Built"}
          icon={<FiUpload />}
          className="text-green-600"
        />
      ),
      onClick: () => openModal(<JobRespondPhaseModal project={project} />),
    },
    {
      key: 2,
      label: (
        <DropdownCustomItem
          label={"Pass"}
          icon={<IoCheckmark />}
          className="text-green-600"
        />
      ),
      onClick: () => openModal(<JobRespondPhaseModal project={project} />),
    },
    {
      key: 3,
      label: (
        <DropdownCustomItem
          label={"Fail"}
          icon={<HiOutlineXMark />}
          className="text-red-600"
        />
      ),
      onClick: () => openModal(<JobRespondPhaseModal project={project} />),
    },
    { key: 4, type: "divider" },
    {
      key: 5,
      label: (
        <DropdownCustomItem
          label={"Reassign Lead"}
          icon={<TbArrowsExchange />}
        />
      ),
      onClick: () => openModal(<JobRespondPhaseModal project={project} />),
    },
    {
      key: 6,
      label: (
        <DropdownCustomItem label={"Close ATP Now"} icon={<IoCheckmark />} />
      ),
      onClick: () => openModal(<JobRespondPhaseModal project={project} />),
    },
    {
      key: 7,
      label: (
        <DropdownCustomItem label={"Add Comment"} icon={<FaRegCommentDots />} />
      ),
      onClick: () => openModal(<JobRespondPhaseModal project={project} />),
    },
  ];

  const columns: ColumnType<Project>[] = [
    {
      title: "ID",
      dataIndex: "jobId",
      key: "jobId",
    },
    {
      title: "Name",
      dataIndex: "customer",
      key: "customer",
      render: (_, { customer, address }) => (
        <TableRowData mainText={customer.customer.name} tagText={address} />
      ),
    },
    {
      title: "Service | Request Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (_, record) => (
        <TableRowData
          mainText={record.serviceType.name}
          tagText={record.requestType.name}
        />
      ),
    },
    {
      title: "Stage",
      dataIndex: "acceptanceStage",
      key: "projectStage",
      render: (_, { acceptanceStage, vendor }) =>
        acceptanceStage === ProjectStage.CLOSED ? (
          <StatusTag status={acceptanceStage} />
        ) : (
          <TableRowData
            mainText={formatStatusEnum(acceptanceStage)}
            tagText={vendor.vendor.companyName}
          />
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
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
    <div className="p-8 space-y-3">
      {/* TODO: Make page header a custom component */}
      <div className="flex items-center justify-between">
        <Header heading={"ATP"} />
        <section className="flex items-center gap-[16px]">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />
          <Button>Generate Report</Button>
          <Button>Refresh</Button>
        </section>
      </div>

      {/* <SummaryCards summaryData={summaryData} /> */}

      <TableComponent<Project>
        columns={columns}
        dataSource={projects}
        scroll={800}
        loading={listProjects.isFetching}
        onRow={(project) => {
          openDrawer(<JobAtpDetailsDrawer project={project} />);
        }}
      />
    </div>
  );
};

export default ProjectAtp;
