import { Tabs, TabsProps } from "antd";
import { Survey } from "../../api/types";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import LogComponent from "../../components/global/Log";
import StatusTag from "../../components/global/StatusTag";
import ProjectDetails from "../../components/projects/ProjectDetails";

interface Props {
  survey: Survey;
}

const SurveyDetailsDrawer = ({ survey }: Props) => {
  const surveyData = [
    {
      label: "customer name",
      value: survey.customer.customer.name,
    },
    {
      label: "Service Address",
      value: survey.address,
    },
    {
      label: "Service type",
      value: survey.serviceType.name,
    },
    {
      label: "Request type",
      value: survey.requestType.name,
    },
    {
      label: "State",
      value: survey.state,
    },
    {
      label: "Region",
      value: survey.region,
    },
    {
      label: "coordinates",
      value: survey.longitude + "," + survey?.lattitude,
    },
    {
      label: "bandwidth",
      value: survey.bandwidth,
    },
    {
      label: "status",
      value: <StatusTag status={survey.status} />,
    },
    {
      label: "Manager",
      value: survey.manager.staff.name,
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Survey Details",
      children: <ProjectDetails data={surveyData} />,
    },
    {
      key: "2",
      label: "Logs",
      children: <LogComponent logs={survey.logs} />,
    },
  ];

  return (
    <CustomDrawer title={survey.surveyId} width={500}>
      <Tabs defaultActiveKey="1" items={items} />
    </CustomDrawer>
  );
};

export default SurveyDetailsDrawer;
