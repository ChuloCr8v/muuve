import { Button, Dropdown, MenuProps } from "antd";
import { ColumnType } from "antd/es/table";
import { AiOutlineRollback } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";
import { CiEdit, CiRedo, CiViewList } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { LuUserCheck } from "react-icons/lu";
import { MdOutlineCancel, MdOutlinePending } from "react-icons/md";
import { PiUserSwitch } from "react-icons/pi";
import { useListSurveysQuery } from "../../api/surveys.api";
import { Survey, SurveyStatus } from "../../api/types";
import DropdownCustomItem from "../../components/global/DropdownCustomItem";
import PageHeader from "../../components/global/PageHeader";
import SummaryCards, {
  SummaryDataType,
} from "../../components/global/SummaryCards";
import TableComponent from "../../components/global/TableComponent";
import TableRowData from "../../components/global/TableRowData";
import SurveyDetailsDrawer from "../../drawers/projects/SurveyDetailsDrawer";
import { usePopup } from "../../context/PopupContext";
import { NewSurveyDrawer } from "../../drawers/projects/NewSurveyDrawer";
import { UpdateSurveyDrawer } from "../../drawers/projects/UpdateSurveyDrawer";
import { AssignSurveyModal } from "../../modals/projects/AssignSurveyModal";
import { CompleteSurveyModal } from "../../modals/projects/CompleteSurveyModal";
import { DeleteSurveyModal } from "../../modals/projects/DeleteSurveyModal";
import { ReassignSurveyModal } from "../../modals/projects/ReassignSurveyModal";
import { RejectSurveyModal } from "../../modals/projects/RejectSurveyModal";
import { RevertSurveyModal } from "../../modals/projects/RevertSurveyModal";
import { capitalizeFirstLetter } from "../../utils/capitalize.util";

const ProjectSurvey = () => {
  const { openDrawer, openModal } = usePopup();

  const listSurvey = useListSurveysQuery();

  const surveys = listSurvey.data ?? [];

  const summaryData: SummaryDataType[] = [
    {
      label: "Total",
      value: surveys.length || 0,
      background: "#F2F9FC",
      iconColor: "#0A95CC",
      iconBg: "#0A95CC1A",
      icon: <CiViewList size={24} />,
    },
    {
      label: "Pending",
      background: "#FAF8EE",
      value:
        surveys.filter(
          (s) =>
            s.status !== SurveyStatus.REJECTED &&
            s.status !== SurveyStatus.COMPLETED
        ).length || 0,
      icon: <MdOutlinePending size={24} />,
      iconBg: "#B9A3251A",
      iconColor: "#B9A325",
    },
    {
      label: "Rejected",
      value:
        surveys.filter((s) => s.status === SurveyStatus.REJECTED).length || 0,
      background: "#FBEEEE",
      icon: <MdOutlineCancel size={24} />,
      iconBg: "#C42A2A1A",
      iconColor: "#C42A2A",
    },
    {
      label: "Completed",
      value:
        surveys.filter((s) => s.status === SurveyStatus.COMPLETED).length || 0,
      background: "#F0F9F2",
      icon: <IoMdCheckmarkCircleOutline size={24} />,
      iconBg: "#40B5541A",
      iconColor: "#40B554",
    },
  ];

  const surveyActionItems = (survey: Survey): MenuProps["items"] => [
    survey.status === SurveyStatus.ONGOING
      ? {
          key: 0,
          label: (
            <DropdownCustomItem
              label={"Complete"}
              icon={<IoCheckmark />}
              className="text-green-600"
            />
          ),
          onClick: () => openModal(<CompleteSurveyModal survey={survey} />),
        }
      : null,
    // { key: 1, type: "divider" },
    survey.status === SurveyStatus.REQUESTED && !survey.isAssigned
      ? {
          key: 2,
          label: (
            <div className="">
              <DropdownCustomItem
                label={"Assign Survey"}
                icon={<LuUserCheck className="" />}
              />
            </div>
          ),
          onClick: () => openModal(<AssignSurveyModal survey={survey} />),
        }
      : null,
    (survey.status === SurveyStatus.REQUESTED ||
      survey.status === SurveyStatus.REVERTED) &&
    survey.isAssigned
      ? {
          key: 3,
          label: (
            <div className="">
              <DropdownCustomItem
                label={"Reassign"}
                icon={<PiUserSwitch className="" />}
              />
            </div>
          ),
          onClick: () => openModal(<ReassignSurveyModal survey={survey} />),
        }
      : null,
    survey.status === SurveyStatus.REQUESTED && !survey.isAssigned
      ? {
          key: 4,
          label: <DropdownCustomItem label={"Edit Survey"} icon={<CiEdit />} />,
          onClick: () => openDrawer(<UpdateSurveyDrawer survey={survey} />),
        }
      : null,
    survey.status === SurveyStatus.REJECTED
      ? {
          key: 5,
          label: <DropdownCustomItem label={"Reopen"} icon={<CiRedo />} />,
          onClick: () => openDrawer(<UpdateSurveyDrawer survey={survey} />),
        }
      : null,
    // { key: 6, type: "divider" },
    survey.status === SurveyStatus.ONGOING
      ? {
          key: 7,
          label: (
            <div>
              <DropdownCustomItem
                className="text-red-600"
                label={"Revert"}
                icon={<AiOutlineRollback className="" />}
              />
            </div>
          ),
          onClick: () => openModal(<RevertSurveyModal survey={survey} />),
        }
      : null,
    survey.status === SurveyStatus.REQUESTED ||
    survey.status === SurveyStatus.REVERTED
      ? {
          key: 8,
          label: (
            <div>
              <DropdownCustomItem
                className="text-red-600"
                label={"Reject Survey"}
                icon={<CgCloseO className="" />}
              />
            </div>
          ),
          onClick: () => openModal(<RejectSurveyModal survey={survey} />),
        }
      : null,
    survey.status === SurveyStatus.REQUESTED && !survey.isAssigned
      ? {
          key: 9,
          label: (
            <div>
              <DropdownCustomItem
                className="text-red-600"
                label={"Delete"}
                icon={<BiTrash className="" />}
              />
            </div>
          ),
          onClick: () => openModal(<DeleteSurveyModal survey={survey} />),
        }
      : null,
  ];

  const columns: ColumnType<Survey>[] = [
    {
      title: "ID",
      dataIndex: "surveyId",
      key: "surveyId",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { assignee, status }) => (
        <TableRowData
          mainText={capitalizeFirstLetter(status)}
          tagText={assignee?.staff.name}
        />
      ),
    },
    {
      title: "SLA",
      dataIndex: ["sla", "due"],
      key: "requestType",
      // render: (_, record) => (
      // <TableRowData
      //   mainText={<SLATime sla={record.dueDate} status={record.status} />}
      //   tagText={`Due: ${dayjs(record.dueDate).format("DD MMM YYYY")}`}
      // />
      // )
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, record) =>
        record.status !== SurveyStatus.COMPLETED && (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: surveyActionItems(record),
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
      <PageHeader
        heading={"Surveys"}
        onclick={() => openDrawer(<NewSurveyDrawer />)}
        handleRefresh={() => console.log("first")}
        handleGenerateReport={() => console.log("first")}
      />

      <SummaryCards summaryData={summaryData} />

      <TableComponent<Survey>
        columns={columns}
        dataSource={surveys}
        scroll={800}
        loading={listSurvey.isFetching}
        onRow={(record) => {
          openDrawer(<SurveyDetailsDrawer survey={record} />);
        }}
      />
    </div>
  );
};

export default ProjectSurvey;
