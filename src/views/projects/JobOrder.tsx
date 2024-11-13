import { abbreviateLastName } from "@/utils/abbreviateName";
import { calculateSlaDays } from "@/utils/calculateSlaDays";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, MenuProps } from "antd";
import { ColumnType } from "antd/es/table";
import {
  AiOutlineRedo,
  AiOutlineRollback,
  AiOutlineSignature,
} from "react-icons/ai";
import { BiCommentCheck } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { FiUpload, FiUserPlus } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPlayCircleOutline } from "react-icons/io5";
import { LuUserCheck } from "react-icons/lu";
import { MdDoNotDisturbAlt, MdOutlineCancel, MdUpdate } from "react-icons/md";
import { PiUserSwitch } from "react-icons/pi";
import { TbArrowsExchange } from "react-icons/tb";
import { useListProjectsQuery } from "../../api/project.api";
import { Project, ProjectStage } from "../../api/types";
import DropdownCustomItem from "../../components/global/DropdownCustomItem";
import Header from "../../components/global/Header";
import StatusTag from "../../components/global/StatusTag";
import TableComponent from "../../components/global/TableComponent";
import TableRowData from "../../components/global/TableRowData";
import { usePopup } from "../../context/PopupContext";
import { EditJobDrawer } from "../../drawers/projects/EditJobDrawer";
import ProjectDetailsDrawer from "../../drawers/projects/JobDetailsDrawer";
import { AddJobCommentModal } from "../../modals/projects/AddJobCommentModal";
import { AssignJobModal } from "../../modals/projects/AssignJobModal";
import { AssignJobVendorModal } from "../../modals/projects/AssignJobVendorModal";
import { CancelJobModal } from "../../modals/projects/CancelJobModal";
import { JobChangeVendor } from "../../modals/projects/JobChangeVendorModal";
import { JobDesignRework } from "../../modals/projects/JobDesignRework";
import { JobRespondPhaseModal } from "../../modals/projects/JobRespondPhaseModal";
import { JobRevertModal } from "../../modals/projects/JobRevertModal";
import { JobUploadDesignModal } from "../../modals/projects/JobUploadDesignModal";
import { JobVendorUpdateModal } from "../../modals/projects/JobVendorUpdateModal";
import { LeadUpdateJobPhaseModal } from "../../modals/projects/LeadUpdateJobPhaseModal";
import { ReassignJobLeadModal } from "../../modals/projects/ReassignJobLeadModal";
import { ReassignJobModal } from "../../modals/projects/ReassignJobModal";
import { SuspendJobModal } from "../../modals/projects/SuspendJobModal";
import { formatStatusEnum } from "../../utils/formatEnum";
import { NewJobDrawer } from "@/drawers/projects/NewJobDrawer";
import { JobSignoffModal } from "@/modals/projects/JobSignoffModal";
import { useGetAuthUserQuery } from "@/api/auth.api";
import { getInitials } from "@/utils/getInitials";
import { JobCustomerSignoffModal } from "@/modals/projects/JobCustomerSignoffModal";

const JobOrder = () => {
  const { openDrawer, openModal } = usePopup();

  const { data: user } = useGetAuthUserQuery();

  const listProjects = useListProjectsQuery({ customer: !!user?.customer });
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
    project.projectStage === ProjectStage.PROJECT_SIGNOFF
      ? {
          key: 0,
          label: (
            <DropdownCustomItem
              label={"Sign Off"}
              icon={<AiOutlineSignature />}
              className="text-green-600"
            />
          ),
          onClick: () => openModal(<JobSignoffModal project={project} />),
        }
      : null,
    project.unapprovedStage
      ? {
          key: 0,
          label: (
            <DropdownCustomItem
              label={"Approve / Deny"}
              icon={<CiEdit />}
              className="text-green-600"
            />
          ),
          onClick: () => openModal(<JobRespondPhaseModal project={project} />),
        }
      : null,
    !project.isAssigned
      ? {
          key: 1,
          label: (
            <DropdownCustomItem
              label={"Assign"}
              icon={<LuUserCheck />}
              className="text-green-600"
            />
          ),
          onClick: () => openModal(<AssignJobModal project={project} />),
        }
      : null,
    !project.isVendorAssigned
      ? {
          key: 2,
          label: (
            <DropdownCustomItem
              label={"Assign Vendor"}
              icon={<FiUserPlus />}
              className="text-green-600"
            />
          ),
          onClick: () => openModal(<AssignJobVendorModal project={project} />),
        }
      : null,
    project.isVendorAssigned
      ? {
          key: 3,
          label: (
            <DropdownCustomItem
              label={"Update Phase"}
              icon={<MdUpdate />}
              className="text-green-600"
            />
          ),
          onClick: () =>
            openModal(<LeadUpdateJobPhaseModal project={project} />),
        }
      : null,
    {
      key: 4,
      label: (
        <DropdownCustomItem
          label={"Upload Design"}
          icon={<FiUpload />}
          className="text-green-600"
        />
      ),
      onClick: () => openModal(<JobUploadDesignModal project={project} />),
    },
    !project.isAssigned && !project.isVendorAssigned
      ? {
          key: 5,
          label: (
            <DropdownCustomItem label={"Edit Details"} icon={<CiEdit />} />
          ),
          onClick: () => openDrawer(<EditJobDrawer project={project} />),
        }
      : null,
    project.isAssigned
      ? {
          key: 6,
          label: (
            <DropdownCustomItem label={"Reassign"} icon={<PiUserSwitch />} />
          ),
          onClick: () => openModal(<ReassignJobModal project={project} />),
        }
      : null,
    {
      key: 7,
      label: (
        <DropdownCustomItem
          label={"Reassign Lead"}
          icon={<TbArrowsExchange />}
        />
      ),
      onClick: () => openModal(<ReassignJobLeadModal project={project} />),
    },
    {
      key: 8,
      label: (
        <DropdownCustomItem label={"Add Comment"} icon={<FaRegCommentDots />} />
      ),
      onClick: () => openModal(<AddJobCommentModal project={project} />),
    },
    project.projectStage === ProjectStage.SUSPENDED
      ? {
          key: 9,
          label: (
            <DropdownCustomItem
              label={"Resume"}
              icon={<IoPlayCircleOutline />}
            />
          ),
          onClick: () =>
            openModal(<LeadUpdateJobPhaseModal project={project} />),
        }
      : null,
    project.isVendorAssigned
      ? {
          key: 10,
          label: (
            <DropdownCustomItem
              label={"Vendor Update"}
              icon={<BiCommentCheck />}
            />
          ),
          onClick: () => openModal(<JobVendorUpdateModal project={project} />),
        }
      : null,
    project.isVendorAssigned
      ? {
          key: 11,
          label: (
            <DropdownCustomItem
              label={"Change Vendor"}
              icon={<TbArrowsExchange />}
            />
          ),
          onClick: () => openModal(<JobChangeVendor project={project} />),
        }
      : null,
    project.isDesignUploaded
      ? {
          key: 12,
          label: (
            <DropdownCustomItem label={"Reupload Design"} icon={<FiUpload />} />
          ),
          onClick: () => openModal(<JobUploadDesignModal project={project} />),
        }
      : null,
    project.isAssigned
      ? {
          key: 13,
          label: (
            <DropdownCustomItem
              label={"Revert"}
              icon={<AiOutlineRollback />}
              className="text-red-600"
            />
          ),
          onClick: () => openModal(<JobRevertModal project={project} />),
        }
      : null,
    {
      key: 14,
      label: (
        <DropdownCustomItem
          label={"Rework Design"}
          icon={<AiOutlineRedo />}
          className="text-red-600"
        />
      ),
      onClick: () => openModal(<JobDesignRework project={project} />),
    },
    // : null,
    project.isVendorAssigned &&
    project.projectStage !== ProjectStage.SUSPENDED &&
    project.unapprovedStage !== ProjectStage.SUSPENDED
      ? {
          key: 15,
          label: (
            <DropdownCustomItem
              label={"Suspend"}
              icon={<MdDoNotDisturbAlt />}
              className="text-red-600"
            />
          ),
          onClick: () => openModal(<SuspendJobModal project={project} />),
        }
      : null,
    {
      key: 16,
      label: (
        <DropdownCustomItem
          label={"Cancel"}
          icon={<MdOutlineCancel />}
          className="text-red-600"
        />
      ),
      onClick: () => openModal(<CancelJobModal project={project} />),
    },
  ];

  const adminColumns: ColumnType<Project>[] = [
    {
      title: "ID",
      dataIndex: "jobId",
      key: "jobId",
      render: (jobId) => <span className="font-semibold">{jobId}</span>,
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
      title: "Service",
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
      title: "Design Stage",
      dataIndex: "designStage",
      key: "designStage",
      render: (_, record) => (
        <TableRowData
          mainText={formatStatusEnum(record.designStage)}
          tagText={
            record.isAssigned && !record.design
              ? `${abbreviateLastName(record.assignee.staff.name)} | SLA: ${
                  calculateSlaDays(
                    record.designAssignedDate,
                    record.designDueDate,
                    record.isDesignSlaInWorkDays
                  ).slaText
                }`
              : record.manager.staff.name
          }
        />
      ),
    },
    {
      title: "Project Stage",
      dataIndex: "projectStage",
      key: "projectStage",
      render: (_, project) =>
        project.unapprovedStage ? (
          <TableRowData
            mainText={`Approve ${formatStatusEnum(
              project.unapprovedStage
            )} Stage`}
          />
        ) : project.projectStage === ProjectStage.CANCELLED ||
          project.projectStage === ProjectStage.SUSPENDED ? (
          <StatusTag
            status={formatStatusEnum(project.projectStage)}
            textColor="#ff0000"
            bgColor="#fee2e2"
          />
        ) : project.isVendorAssigned &&
          project.projectStage === ProjectStage.IMPLEMENTATION ? (
          <TableRowData
            mainText={project.phase}
            tagText={`${
              project.vendor.vendor.companyName
            } | ${abbreviateLastName(project.vendor.vendor.spocName)} | ${
              calculateSlaDays(
                project.vendorAssignedDate,
                project.projectDueDate,
                project.isProjectSlaInWorkDays
              ).slaText
            }`}
          />
        ) : (
          <TableRowData
            mainText={formatStatusEnum(project.projectStage)}
            tagText={project.lead.staff.name}
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
            <Button className="px-4 text-grey">
              Action
              <IoMdArrowDropdown />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  const customerColumns: ColumnType<Project>[] = [
    {
      title: "ID",
      dataIndex: "jobId",
      key: "jobId",
      render: (jobId) => <span className="font-semibold">{jobId}</span>,
    },
    {
      title: "Service Description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Service",
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
      title: "Coordinator",
      dataIndex: "lead",
      render: (_, { lead }) => (
        <div className="flex space-x-2">
          <Avatar
            className="bg-[#EFF7FB] font-semibold text-[#0A96CC] text-[3px]"
            size={24}
          >
            {getInitials(lead.staff.name)}
          </Avatar>
          <p>{lead.staff.name}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { projectStage }) =>
        projectStage === ProjectStage.CLOSED ||
        projectStage === ProjectStage.CANCELLED ||
        projectStage === ProjectStage.SUSPENDED ? (
          <StatusTag status={projectStage} />
        ) : (
          <StatusTag status={"Ongoing"} />
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, project) => (
        <div onClick={(e) => e.stopPropagation()}>
          {project.projectStage === ProjectStage.CUSTOMER_SIGNOFF && (
            <Button
              className="px-4 text-white bg-primary"
              size="small"
              onClick={() =>
                openModal(<JobCustomerSignoffModal project={project} />)
              }
            >
              Sign Off
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-3">
      {/* TODO: Make page header a custom component */}
      <div className="flex items-center justify-between">
        <Header heading={"Job Orders"} />
        <section className="flex items-center gap-[16px]">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />
          <Button>Generate Report</Button>
          <Button>Refresh</Button>

          {/* Roles and permissions will take over customer */}

          {!user?.customer && (
            <Button
              type="primary"
              className="flex items-center"
              onClick={() => openDrawer(<NewJobDrawer />)}
            >
              New Job Order
            </Button>
          )}
        </section>
      </div>

      {/* <SummaryCards summaryData={summaryData} /> */}

      <TableComponent<Project>
        columns={user?.customer ? customerColumns : adminColumns}
        dataSource={projects}
        loading={listProjects.isFetching}
        onRow={(project) => {
          openDrawer(<ProjectDetailsDrawer project={project} user={user} />);
        }}
      />
    </div>
  );
};

export default JobOrder;
