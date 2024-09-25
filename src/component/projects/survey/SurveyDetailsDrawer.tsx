import { Drawer, Tabs, TabsProps } from "antd";
import { DataType } from "../../TableItems/columns/SurveyTable";
import ProjectDetailsDrawerHeading from "../../Global/ProjectDetailsDrawerHeading";
import SurveyDetails from "./SurveyDetails";
import StatusTag from "../../Global/StatusTag";
import SurveyLog from "./SurveyLog";

type Props = {
  data: DataType | null;
  isOpen: boolean;
  onclose: () => void;
};

const SurveyDetailsDrawer = ({ data, isOpen, onclose }: Props) => {
  const surveyData = [
    {
      label: "customer name",
      value: data?.customerName,
    },
    {
      label: "Service Address",
      value: data?.serviceAddress,
    },
    {
      label: "Project type",
      value: data?.serviceType,
    },
    {
      label: "Service type",
      value: data?.serviceType,
    },
    {
      label: "Request type",
      value: data?.requestType,
    },
    {
      label: "State",
      value: data?.state,
    },
    {
      label: "Region",
      value: data?.region,
    },
    {
      label: "coordinates",
      value: data?.latitude + "," + data?.longitude,
    },
    {
      label: "bandwidth",
      value: data?.bandwidth,
    },
    {
      label: "status",
      value: <StatusTag status={data?.status} />,
    },
    {
      label: "Manager",
      value: data?.manager,
    },
    {
      label: "engineer",
      value: data?.engineer,
    },
    {
      label: "start date",
      value: data?.dueDate,
    },
    {
      label: "Payment Status",
      value: data?.paymentStatus,
    },
    {
      label: "Comment",
      value: data?.comment,
    },
    {
      label: "uploads",
      value: data?.uploads,
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Survey Details",
      children: <SurveyDetails surveyData={surveyData} />,
    },
    {
      key: "2",
      label: "Logs",
      children: <SurveyLog />,
    },
  ];

  return (
    <Drawer
      open={isOpen}
      onClose={onclose}
      title={false}
      closeIcon={false}
      width={540}
    >
      <ProjectDetailsDrawerHeading title={data?.id} />
      <Tabs defaultActiveKey="1" items={items} />
    </Drawer>
  );
};

export default SurveyDetailsDrawer;
