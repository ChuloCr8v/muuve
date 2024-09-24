import { Drawer, Tabs, TabsProps } from "antd";
import { JobOrderType } from "../../../types";
import ProjectDetailsDrawerHeading from "../../Global/ProjectDetailsDrawerHeading";
import JobOrderDetails from "./JobOrderDetails";
import JobOrderLogs from "./JobOrderLog";

type Props = {
  data: JobOrderType | null;
  isOpen: boolean;
  onclose: () => void;
};

const JobDetailsDrawer = ({ data, isOpen, onclose }: Props) => {
  const jobData = [
    { label: "Customer Name", value: data?.customerName },
    { label: "Service Address", value: data?.serviceAddress },
    { label: "Service Description", value: data?.serviceDescription },
    { label: "Job ID", value: data?.id },
    { label: "Service Type", value: data?.serviceType },
    { label: "Project Type", value: data?.projectType },
    { label: "Project Category", value: data?.projectCategory },
    { label: "Mode of Delivery", value: data?.modeOfDelivery },
    { label: "Region", value: data?.region },
    { label: "Bandwidth", value: data?.bandwidth },
    { label: "MRR", value: data?.mrr },
    { label: "NRR", value: data?.nrr },
    {
      label: "NRR + MRR",
      value: data?.mrr && data.nrr ? data?.nrr + data?.mrr : 0,
    },
    { label: "Account Partner", value: data?.accountPartner },
    { label: "Customer Contact", value: data?.customerContact },
    { label: "Customer Phone", value: data?.customerPhone },
    { label: "Customer Email", value: data?.customerEmail },
    { label: "Project Due Date", value: data?.projectDueDate },
    { label: "Payment Status", value: data?.paymentStatus },
    { label: "Project Manager", value: data?.projectManager },
    { label: "Project Lead", value: data?.projectLead },
    { label: "Design Manager", value: data?.designManager },
    { label: "Design Engineer", value: data?.designEngineer },
    { label: "Vendor", value: data?.vendor },
    { label: "Stage", value: data?.stage },
    { label: "Uploads", value: data?.uploads },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Job Details",
      children: <JobOrderDetails jobData={jobData} />,
    },
    {
      key: "2",
      label: "Logs",
      children: <JobOrderLogs />,
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
      <ProjectDetailsDrawerHeading title={data?.title} />
      <Tabs defaultActiveKey="1" items={items} />
    </Drawer>
  );
};

export default JobDetailsDrawer;
