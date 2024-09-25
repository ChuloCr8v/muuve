import { UploadFile } from "antd";
import { useState } from "react";
import { BiCreditCardFront, BiUserCheck } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbReceiptEuro } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { SurveyDataType } from "../../types";
import ActionPopup from "../Global/ActionPopup";
import TableComponent from "../Global/TableComponent";
import { SurveyData } from "./SurveyData";
import AssignProjectChildren from "../projects/AssignProjectChildren";
import RejectProjectChildren from "../projects/RejectProjectChildren";
import DeleteProjectChildren from "../projects/DeleteProjectChildren";
import { BsTrash } from "react-icons/bs";
import PaymentAndReceiptChildren from "../projects/PaymentAndReceiptChildren";
import useProjectColumns from "../../hooks/useProjectColumns";
import useProjectActionItems from "../../hooks/useProjectActionItems";

interface Props {
  setSurveyDetailsIsOpen: any;
}

const showModalData = {
  isOpen: false,
  title: "",
  sendButtonText: "",
  icon: <IoCloseCircleOutline />,
  sendButtonStyle: "",
  children: <></>,
  onOk: () => {},
};

const SurveyTable = ({ setSurveyDetailsIsOpen }: Props) => {
  const [currentSurvey, setCurrentSurvey] = useState<SurveyDataType>();
  const [comment, setComment] = useState("");
  const [designEngineer, setDesignEngineer] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [showModal, setShowModal] = useState(showModalData);

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
      const commonProps = {
        comment,
        setComment,
        data: currentSurvey,
      };

      switch (action) {
        case "upload receipt":
        case "initiate payment":
          return (
            <PaymentAndReceiptChildren
              action={action}
              fileList={fileList}
              setFileList={setFileList}
              {...commonProps}
            />
          );
        case "reassign":
        case "assign survey":
          return (
            <AssignProjectChildren
              designEngineer={designEngineer}
              setDesignEngineer={setDesignEngineer}
              action={action.toLowerCase()}
              {...commonProps}
            />
          );
        case "reject survey":
          return <RejectProjectChildren {...commonProps} />;
        case "delete":
          return <DeleteProjectChildren data={currentSurvey} />;
        default:
          return <>No Data</>;
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
      sendButtonStyle: ["reject survey", "delete"].includes(action)
        ? "bg-red-600 hover:!bg-red-800"
        : "",
      children: children(),
      onOk: () => onOk(),
    });
  };

  const { survetyActionItems } = useProjectActionItems({ handleShowPopup });
  const { projectColumns } = useProjectColumns({
    items: survetyActionItems,
    setCurrentData: setCurrentSurvey,
  });

  const handleRowClick = (record: any) => {
    setSurveyDetailsIsOpen({ isOpen: true, data: record });
  };

  return (
    <>
      <TableComponent
        columns={projectColumns}
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
