import { useState } from "react";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import PageHeader from "../../component/Global/PageHeader";
import SummaryCards from "../../component/Global/SummaryCards";
import JobDetailsDrawer from "../../component/projects/jobOrders/JobDetailsDrawer";
import JobOrdersTable from "../../component/projects/jobOrders/JobOrdersTable";
import NewJobOrderForm from "../../component/projects/jobOrders/NewJobOrderForm";
import { JobOrderType } from "../../types";
import { GrOrderedList } from "react-icons/gr";
import { CiWarning } from "react-icons/ci";

const JobOrders = () => {
  const [newJobOrder, setNewJobOrder] = useState(false);
  const [jobDetailsIsOpen, setJobDetailsIsOpen] = useState<{
    isOpen: boolean;
    data: JobOrderType | null;
  }>({ isOpen: false, data: null });

  const summaryData = [
    {
      label: "Total",
      value: 50,
      icon: <GrOrderedList className="!text-5xl" />,
    },
    {
      label: "Active",
      value: 30,
      icon: <VscVmActive className="!text-5xl" />,
    },
    {
      label: "Deactivated",
      value: 5,
      icon: <FaBan className="!text-5xl" />,
    },
    {
      label: "Expiring",
      value: 25,
      icon: <CiWarning className="!text-5xl" />,
    },
  ];

  const closeDrawer = () => {
    setJobDetailsIsOpen((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="space-y-3">
      <PageHeader
        heading={"Job Orders"}
        onclick={() => setNewJobOrder(true)}
        handleRefresh={() => console.log("first")}
        handleGenerateReport={() => console.log("first")}
      />

      <SummaryCards summaryData={summaryData} />
      <JobOrdersTable setSurveyDetailsIsOpen={setJobDetailsIsOpen} />

      {/* job details drawer */}
      <JobDetailsDrawer
        data={jobDetailsIsOpen.data}
        isOpen={jobDetailsIsOpen.isOpen}
        onclose={closeDrawer}
      />

      {/* New job form */}
      <NewJobOrderForm open={newJobOrder} setOpen={setNewJobOrder} />
    </div>
  );
};

export default JobOrders;
