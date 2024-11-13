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

const JobAtpDetailsDrawer = ({ project }: Props) => {
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
      label: "Acceptance Stage",
      value: <StatusTag status={formatStatusEnum(project.acceptanceStage)} />,
    },
    {
      label: "Manager",
      value: project.manager.staff.name,
    },
  ];

  const asBuiltData = project.asBuilt
    ? [
        {
          label: "Tx Medium",
          value: project.asBuilt.txMedium,
        },
        {
          label: "Frequency",
          value: project.asBuilt.frequency,
        },
        {
          label: "Terminal equipment type",
          value: project.asBuilt.terminalEquipmentType,
        },
        {
          label: "Service VLAN",
          value: project.asBuilt.terminalEquipmentType,
        },
        {
          label: "CustomerId",
          value: project.asBuilt.customerId,
        },
        {
          label: "Loopback IP",
          value: project.asBuilt.loopbackIp,
        },
        {
          label: "LAN-IP",
          value: project.asBuilt.lanIp,
        },
        {
          label: "UPE/CTN interface",
          value: project.asBuilt.upnCtnInterface,
        },
        {
          label: "Latitude",
          value: project.asBuilt.latitude,
        },
        {
          label: "Longitude",
          value: project.asBuilt.longitude,
        },
        {
          label: "Connecting Site ID",
          value: project.asBuilt.connectingSiteId,
        },
        {
          label: "Connecting Site Name",
          value: project.asBuilt.connectingSiteName,
        },
        {
          label: "LGA",
          value: project.asBuilt.lga,
        },
        {
          label: "Service Provider",
          value: project.asBuilt.serviceProvider,
        },
        {
          label: "CPE Type",
          value: project.asBuilt.cpeType,
        },
        {
          label: "CE Device",
          value: project.asBuilt.ceDevice,
        },
        {
          label: "Radio Version",
          value: project.asBuilt.radioVersion,
        },
        {
          label: "Antenna",
          value: project.asBuilt.antenna,
        },
        {
          label: "Indoor",
          value: project.asBuilt.indoor,
        },
        {
          label: "Polarization",
          value: project.asBuilt.polarization,
        },
        {
          label: "Device OEM",
          value: project.asBuilt.deviceOem,
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
    ...(project.asBuilt
      ? [
          {
            key: "3",
            label: "As-Built",
            children: <ProjectDetails data={asBuiltData} />,
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

export default JobAtpDetailsDrawer;
