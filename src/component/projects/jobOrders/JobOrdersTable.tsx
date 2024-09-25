import { Dispatch, SetStateAction, useState } from "react";
// import Survey from '../../views/projects/Survey';
import { BiCheckCircle, BiTrash, BiUserCheck } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { PiUserCircleCheck, PiUserSwitch } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { JobOrderType } from "../../../types";
import { jobData } from "../../data/JobData";
import ActionPopup from "../../Global/ActionPopup";
import TableComponent from "../../Global/TableComponent";
import AssignProjectChildren from "../AssignProjectChildren";
import DeleteProjectChildren from "../DeleteProjectChildren";
import RejectProjectChildren from "../RejectProjectChildren";
import SignoffProjectChildren from "../SignoffProjectChildren";
import useProjectActionItems from "../../../hooks/useProjectActionItems";
import useProjectColumns from "../../../hooks/useProjectColumns";

interface Props {
  setSurveyDetailsIsOpen: any;
  setEditJobOrder: Dispatch<
    SetStateAction<{ isOpen: boolean; jobOrderId: string | undefined }>
  >;
}

const JobOrdersTable = ({ setSurveyDetailsIsOpen, setEditJobOrder }: Props) => {
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

    if (action === "edit details") {
      setEditJobOrder({ isOpen: true, jobOrderId: currentJob?.id });
      return;
    }

    const icon = () => {
      switch (action.toLowerCase()) {
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

  const { jobOrderActionItems } = useProjectActionItems({ handleShowPopup });
  const { projectColumns } = useProjectColumns({
    items: jobOrderActionItems,
    setCurrentData: setCurrentJob,
  });

  return (
    <>
      <TableComponent
        columns={projectColumns}
        dataSource={jobData}
        scroll={1000}
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
