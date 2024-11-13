import { useDownloadAttachment } from "@/hooks/useDownloadAttachment";
import { Spin, Tabs, TabsProps } from "antd";
import { GoDownload } from "react-icons/go";
import { Project, User } from "../../api/types";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import LogComponent from "../../components/global/Log";
import StatusTag from "../../components/global/StatusTag";
import { VendorUpdateLog } from "../../components/global/VendorUpdateLog";
import ProjectDetails from "../../components/projects/ProjectDetails";
import { formatStatusEnum } from "../../utils/formatEnum";

interface Props {
  project: Project;
  user?: User;
}

const ProjectDetailsDrawer = ({ project, user }: Props) => {
  const { download, downloadingId, isDownloading } = useDownloadAttachment();

  function addItem(condition: boolean, item: { label: string; value: any }) {
    return condition ? item : null;
  }

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
      label: "Mode Of Delivery",
      value: project.modeOfDelivery.name,
    },
    {
      label: "Project Category",
      value: project.category.name,
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
    addItem(!user?.customer, {
      label: "Project Stage",
      value: <StatusTag status={formatStatusEnum(project.projectStage)} />,
    }),
    addItem(!user?.customer, {
      label: "Design Stage",
      value: <StatusTag status={formatStatusEnum(project.designStage)} />,
    }),
    addItem(!user?.customer, {
      label: "Manager",
      value: project.manager.staff.name,
    }),
    {
      label: "service description",
      value: project.description,
    },
  ].filter((item) => item !== null);

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
          value: project.design.upeCtnInterface,
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
    ...(project.design && !user?.customer
      ? [
          {
            key: "3",
            label: "Design",
            children: <ProjectDetails data={designData} />,
          },
        ]
      : []),
    ...(project.isVendorAssigned && !user?.customer
      ? [
          {
            key: "2",
            label: "Vendor Updates",
            children: <VendorUpdateLog logs={project.vendorUpdates} />,
          },
        ]
      : []),
    ...(!user?.customer
      ? [
          {
            key: "4",
            label: "Logs",
            children: <LogComponent logs={project.logs} />,
          },
        ]
      : []),
  ];

  return (
    <CustomDrawer title={project.jobId} width={500}>
      <Tabs defaultActiveKey="1" items={items} />
    </CustomDrawer>
  );
};

export default ProjectDetailsDrawer;
