import { useDownloadAttachment } from "@/hooks/useDownloadAttachment";
import { Spin, Tabs, TabsProps } from "antd";
import { GoDownload } from "react-icons/go";
import { Project } from "../../api/types";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import LogComponent from "../../components/global/Log";
import StatusTag from "../../components/global/StatusTag";
import { VendorUpdateLog } from "../../components/global/VendorUpdateLog";
import ProjectDetails from "../../components/projects/ProjectDetails";
import { formatStatusEnum } from "../../utils/formatEnum";

interface Props {
  project: Project;
}

const ProjectDetailsDrawer = ({ project }: Props) => {
  const { download, downloadingId, isDownloading } = useDownloadAttachment();

  const projectData = [
    {
      label: "customer name",
      value: project.customer.customer.name,
    },
    {
      label: "Service Address",
      value: project.address,
    },
    {
      label: "Service type",
      value: project.serviceType.name,
    },
    {
      label: "Request type",
      value: project.requestType.name,
    },
    {
      label: "State",
      value: project.state,
    },
    {
      label: "Region",
      value: project.region,
    },
    {
      label: "coordinates",
      value: project.longitude + "," + project?.latitude,
    },
    {
      label: "bandwidth",
      value: project.bandwidth,
    },
    {
      label: "Project Stage",
      value: <StatusTag status={formatStatusEnum(project.projectStage)} />,
    },
    {
      label: "Design Stage",
      value: <StatusTag status={formatStatusEnum(project.designStage)} />,
    },
    {
      label: "Manager",
      value: project.manager.staff.name,
    },
  ];

  const designData = project.design
    ? [
        {
          label: "Tx Medium",
          value: project.design.txMedium,
        },
        {
          label: "Frequency",
          value: project.design.frequency,
        },
        {
          label: "Terminal equipment type",
          value: project.design.terminalEquipmentType,
        },
        {
          label: "Service VLAN",
          value: project.design.terminalEquipmentType,
        },
        {
          label: "CustomerId",
          value: project.design.customerId,
        },
        {
          label: "Loopback IP",
          value: project.design.loopbackIp,
        },
        {
          label: "LAN-IP",
          value: project.design.lanIp,
        },
        {
          label: "UPE/CTN interface",
          value: project.design.upnCtnInterface,
        },
        {
          label: "Latitude",
          value: project.design.latitude,
        },
        {
          label: "Longitude",
          value: project.design.longitude,
        },
        {
          label: "Connecting Site ID",
          value: project.design.connectingSiteId,
        },
        {
          label: "Connecting Site Name",
          value: project.design.connectingSiteName,
        },
        {
          label: "Comment",
          value: project.design.comment,
        },
        {
          label: "Attachments",
          value: project.design.attachments.uploads.map((up) => (
            <div
              className="flex items-center px-2 py-1 space-x-2 border rounded-full cursor-pointer border-primary text-primary"
              key={up.id}
              onClick={() => {
                downloadingId;
                download(up.name, up.id);
              }}
            >
              {isDownloading && downloadingId === up.id ? (
                <Spin size="small" />
              ) : (
                <GoDownload />
              )}
              <span>{up.name}</span>
            </div>
          )),
        },
      ]
    : [];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Order Details",
      children: <ProjectDetails data={projectData} />,
    },
    ...(project.design
      ? [
          {
            key: "3",
            label: "Design",
            children: <ProjectDetails data={designData} />,
          },
        ]
      : []),
    ...(project.isVendorAssigned
      ? [
          {
            key: "2",
            label: "Vendor Updates",
            children: <VendorUpdateLog logs={project.vendorUpdates} />,
          },
        ]
      : []),
    {
      key: "4",
      label: "Logs",
      children: <LogComponent logs={project.logs} />,
    },
  ];

  return (
    <CustomDrawer title={project.jobId} width={500}>
      <Tabs defaultActiveKey="1" items={items} />
    </CustomDrawer>
  );
};

export default ProjectDetailsDrawer;
