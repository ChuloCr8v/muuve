import { Button, Dropdown, MenuProps, UploadFile } from "antd";
import { useState } from "react";
import { CloudUploadOutlined, EyeOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { BiCreditCardFront, BiTrash, BiUserCheck } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbReceiptEuro } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import SLATime from "../../hooks/useGetSLA";
import { SurveyDataType } from "../../types";
import ActionPopup from "../Global/ActionPopup";
import DropdownCustomItem from "../Global/DropdownCustomItem";
import TableComponent from "../Global/TableComponent";
import TableRowData from "../Global/TableRowData";
import { SurveyData } from "./SurveyData";
import AssignProjectChildren from "../projects/AssignProjectChildren";
import RejectProjectChildren from "../projects/RejectProjectChildren";
import { GrAtm } from "react-icons/gr";
import { PiUserSwitch } from "react-icons/pi";
import { CgCloseO } from "react-icons/cg";
import DeleteProjectChildren from "../projects/DeleteProjectChildren";
import { BsTrash } from "react-icons/bs";
import PaymentAndReceiptChildren from "../projects/PaymentAndReceiptChildren";

interface Props {
  setSurveyDetailsIsOpen: any;
}

const SurveyTable = ({ setSurveyDetailsIsOpen }: Props) => {
  const [currentSurvey, setCurrentSurvey] = useState<SurveyDataType>();
  const [comment, setComment] = useState("");
  const [designEngineer, setDesignEngineer] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
      switch (action) {
        case "reject survey":
          return <IoCloseCircleOutline className="text-3xl" />;
        case "assign survey":
        case "reassign survey":
          return <IoCloseCircleOutline className="text-3xl" />;
        case "initiate payment":
          return <BiCreditCardFront className="text-3xl" />;
        case "upload receipt":
          return <TbReceiptEuro className="text-3xl" />;
        case "delete":
          return <BsTrash className="text-3xl" />;
        default:
          return <BiUserCheck className="text-3xl" />;
      }
    };

    const children = () => {
      switch (action) {
        case "upload receipt":
        case "initiate payment":
          return (
            <PaymentAndReceiptChildren
              action={action}
              comment={comment}
              setComment={setComment}
              data={currentSurvey}
              fileList={fileList}
              setFileList={setFileList}
            />
          );
        case "reassign":
        case "assign survey":
          return (
            <AssignProjectChildren
              designEngineer={designEngineer}
              comment={comment}
              setComment={setComment}
              setDesignEngineer={setDesignEngineer}
              data={currentSurvey}
              action={action.toLowerCase()}
            />
          );
        case "reject survey":
          return (
            <RejectProjectChildren
              data={currentSurvey}
              comment={comment}
              setComment={setComment}
            />
          );
        case "delete":
          return <DeleteProjectChildren data={currentSurvey} />;
        default:
          return <>No Data </>;
      }
    };

    const onOk = () => {
      switch (action) {
        case "Edit Details":
          return console.log(action);
        case "initiate payment":
          return console.log(action);
        case "upload receipt":
          return console.log(action);
        case "assign survy":
          return console.log(action);
        case "reassign":
          return console.log(action);
        case "reject survey":
          return console.log(action);
        case "delete":
          return console.log(action);

        default:
          return console.log(action);
      }
    };

    setShowModal({
      isOpen: true,
      icon: (
        <div
          className={twMerge(
            "rounded-full h-12 w-12 flex items-center justify-center",
            action === "reject survey" || action === "delete"
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
        action === "reject survey" || action === "delete"
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
      // onClick: () => showModal('Edit Details', '/path/to/edit-icon.svg'),
    },
    {
      key: 2,
      label: (
        <div
          className=""
          onClick={(e) => handleShowPopup(e, "initiate payment")}
        >
          <DropdownCustomItem
            label={"Initiate Payment"}
            icon={<GrAtm className="" />}
          />
        </div>
      ),
    },

    {
      key: 3,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "upload receipt")}>
          <DropdownCustomItem
            label={"Upload Receipt"}
            icon={<CloudUploadOutlined />}
          />
        </div>
      ),
    },
    {
      key: 4,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "assign survey")}>
          <DropdownCustomItem
            label={"Assign Survey"}
            icon={<BiUserCheck className="text-2xl" />}
          />
        </div>
      ),
    },

    {
      key: 5,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "reassign")}>
          <DropdownCustomItem
            label={"Reassign"}
            icon={<PiUserSwitch className="text-2xl" />}
          />
        </div>
      ),
    },
    {
      key: 6,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "reject survey")}>
          <DropdownCustomItem
            label={"Reject Survey"}
            icon={<CgCloseO className="text-xl" />}
          />
        </div>
      ),
    },
    {
      key: 7,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "delete")}>
          <DropdownCustomItem
            label={"Delete"}
            icon={<BiTrash className="text-xl" />}
          />
        </div>
      ),
    },
  ];

  const columns: ColumnType<SurveyDataType>[] = [
    {
      title: "ID",
      dataIndex: "id",
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
          tagText={record.requestType}
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
          tagText={record.manager}
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
          mainText={<SLATime sla={record.dueDate} status={record.status} />}
          tagText={`Due: ${dayjs(record.dueDate).format("DD MMM YYYY")}`}
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
              setCurrentSurvey(record);
              console.log(currentSurvey);
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
        dataSource={SurveyData}
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

export default SurveyTable;
