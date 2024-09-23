import { Button, Dropdown, MenuProps } from "antd";
import { useState } from "react";
// import Survey from '../../views/projects/Survey';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { BiCheckCircle, BiTrash, BiUserCheck } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { PiUserCircleCheck, PiUserSwitch } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import SLATime from "../../../hooks/useGetSLA";
import { JobOrderType } from "../../../types";
import { jobData } from "../../data/JobData";
import ActionPopup from "../../Global/ActionPopup";
import DropdownCustomItem from "../../Global/DropdownCustomItem";
import TableComponent from "../../Global/TableComponent";
import TableRowData from "../../Global/TableRowData";
import AssignProjectChildren from "../AssignProjectChildren";
import DeleteProjectChildren from "../DeleteProjectChildren";
import RejectProjectChildren from "../RejectProjectChildren";
import SignoffProjectChildren from "../SignoffProjectChildren";

interface Props {
  setSurveyDetailsIsOpen: any;
}

const JobOrdersTable = ({ setSurveyDetailsIsOpen }: Props) => {
  const [currentJob, setCurrentJob] = useState<JobOrderType>();
  const [comment, setComment] = useState("");
  const [designEngineer, setDesignEngineer] = useState("");

  const [showModal, setShowModal] = useState({
    isOpen: false,
    title: "",
    sendButtonText: "",
    icon: <IoCloseCircleOutline />,
    sendButtonStyle: "",
    children: <></>,
    onOk: () => {},
  });

  const handleRowClick = (record: any) => {
    setSurveyDetailsIsOpen({ isOpen: true, data: record });
  };

  const handleShowPopup = (
    e: { stopPropagation: () => void },
    action: string
  ) => {
    e.stopPropagation();

    const icon = () => {
      switch (action.toLowerCase()) {
        case "edit details":
          return <PiUserCircleCheck className="text-3xl" />;
        case "assign job":
          return <PiUserCircleCheck className="text-3xl" />;
        case "reassign job":
          return <PiUserSwitch className="text-3xl" />;
        case "reject job":
          return <IoCloseCircleOutline className="text-3xl" />;
        case "delete job order":
          return <BiTrash className="text-3xl" />;
        case "sign off":
          return <BiCheckCircle className="text-3xl" />;
        default:
          return <BiUserCheck className="text-3xl" />;
      }
    };

    const children = () => {
      switch (action.toLowerCase()) {
        case "reject job":
          return (
            <RejectProjectChildren
              data={currentJob}
              comment={comment}
              setComment={setComment}
            />
          );
        case "assign job":
        case "reassign job":
          return (
            <AssignProjectChildren
              action={action.toLowerCase()}
              designEngineer={designEngineer}
              comment={comment}
              setComment={setComment}
              setDesignEngineer={setDesignEngineer}
              data={currentJob}
            />
          );
        case "delete job order":
          return <DeleteProjectChildren data={currentJob} />;
        case "sign off":
          return <SignoffProjectChildren data={currentJob} />;

        default:
          return <div className="">No Data</div>;
      }
    };

    const onOk = () => {
      switch (action.toLowerCase()) {
        case "edit details":
          return console.log("edit details");
        case "assign job":
          return console.log("assign job");
        case "reassign job":
          return console.log("reassign job");
        case "reject job":
          return console.log("reject job");
        case "delete job order":
          return console.log("delete job");
        case "sign off":
          return console.log("sign off");
        default:
          return console.log("invalid action");
      }
    };

    setShowModal({
      isOpen: true,
      icon: (
        <div
          className={twMerge(
            "rounded-full h-12 w-12 flex items-center justify-center",
            action === "reject job" || action === "delete job order"
              ? "bg-red-100 text-red-600"
              : "bg-primary bg-opacity-20"
          )}
        >
          {icon()}
        </div>
      ),
      title: action,
      sendButtonText: action.split(" ")[0],
      sendButtonStyle:
        action === "reject job" || action === "delete job order"
          ? "bg-red-600 hover:!bg-red-800"
          : "",
      children: children(),
      onOk: () => onOk(),
    });
  };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <DropdownCustomItem label={"Edit Details"} icon={<EyeOutlined />} />
      ),
    },
    {
      key: 2,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "assign job")}>
          <DropdownCustomItem
            label={"Assign Job"}
            icon={<FiUserCheck className="text-xl" />}
          />
        </div>
      ),
    },

    {
      key: 5,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "reassign job")}>
          <DropdownCustomItem
            label={"Reassign Job"}
            icon={<UserSwitchOutlined />}
          />
        </div>
      ),
    },
    {
      key: 6,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "reject job")}>
          <DropdownCustomItem
            label={"Reject Job"}
            icon={<CloseCircleOutlined />}
          />
        </div>
      ),
    },
    {
      key: 7,
      label: (
        <div
          className=""
          onClick={(e) => handleShowPopup(e, "delete job order")}
        >
          <DropdownCustomItem label={"Delete"} icon={<DeleteOutlined />} />{" "}
        </div>
      ),
    },
    {
      key: 8,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "sign off")}>
          <DropdownCustomItem
            label={"Sign Off"}
            icon={<BiCheckCircle />}
            className="text-green-600"
          />
        </div>
      ),
    },
  ];

  const columns: ColumnType<JobOrderType>[] = [
    {
      title: "ID",
      dataIndex: "jobId",
      key: "id",
      render: (_: "string", record) => <TableRowData mainText={record.id} />,
    },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (_: "string", record) => (
        <TableRowData
          mainText={record.customerName}
          tagText={record.serviceAddress}
        />
      ),
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (_: "string", record) => (
        <TableRowData
          mainText={record.serviceType}
          tagText={record.projectType}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <TableRowData
          mainText={record.status}
          tagText={record.projectManager}
          mainTextStyle={`${
            record.status.toLowerCase() === "completed" && "text-primary"
          }`}
        />
      ),
    },
    {
      title: "SLA",
      dataIndex: ["sla", "due"],
      key: "requestType",
      render: (_, record) => (
        <TableRowData
          mainText={
            <SLATime sla={record.projectDueDate} status={record.status} />
          }
          tagText={`Due: ${dayjs(record.projectDueDate).format("DD MMM YYYY")}`}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "latitude",
      key: "latitude",
      width: 150,
      render: (_: string, record) => (
        <Dropdown trigger={["click"]} menu={{ items }}>
          <Button
            size="small"
            className="px-4 text-grey"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentJob(record);
              console.log(currentJob);
            }}
          >
            Action
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <TableComponent
        columns={columns}
        dataSource={jobData}
        scroll={800}
        onRow={(record: Array<{}>) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <ActionPopup
        onOk={showModal.onOk}
        open={showModal.isOpen}
        onCancel={() => setShowModal((prev) => ({ ...prev, isOpen: false }))}
        title={showModal.title}
        sendButtonText={showModal.sendButtonText}
        icon={showModal.icon}
        sendButtonStyle={showModal.sendButtonStyle}
      >
        {showModal.children}
      </ActionPopup>
    </>
  );
};

export default JobOrdersTable;
