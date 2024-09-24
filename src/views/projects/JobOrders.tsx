import { useState } from "react";
import PageHeader from "../../component/Global/PageHeader";
import SummaryCards from "../../component/Global/SummaryCards";
import JobDetailsDrawer from "../../component/projects/jobOrders/JobDetailsDrawer";
import JobOrdersTable from "../../component/projects/jobOrders/JobOrdersTable";
import NewJobOrderForm from "../../component/projects/jobOrders/NewJobOrderForm";
import { JobOrderType } from "../../types";

const JobOrders = () => {
  const [newJobOrder, setNewJobOrder] = useState(false);
  const [jobDetailsIsOpen, setJobDetailsIsOpen] = useState<{
    isOpen: boolean;
    data: JobOrderType | null;
  }>({ isOpen: false, data: null });

  const [editJobOrder, setEditJobOrder] = useState<{
    isOpen: boolean;
    jobOrderId: string | undefined;
  }>({
    isOpen: false,
    jobOrderId: "" || undefined,
  });

  const summaryData = [
    {
      label: "Total",
      value: 50,
    },
    {
      label: "Active",
      value: 30,
    },
    {
      label: "Deactivated",
      value: 5,
    },
    {
      label: "Expiring",
      value: 25,
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
      <JobOrdersTable
        setEditJobOrder={setEditJobOrder}
        setSurveyDetailsIsOpen={setJobDetailsIsOpen}
      />

      {/* job details drawer */}
      <JobDetailsDrawer
        data={jobDetailsIsOpen.data}
        isOpen={jobDetailsIsOpen.isOpen}
        onclose={closeDrawer}
      />

      {/* New job form */}
      <NewJobOrderForm
        open={newJobOrder || editJobOrder.isOpen}
        setEditJobOrder={setEditJobOrder}
        setOpen={setNewJobOrder}
        editJobOrder={editJobOrder}
      />
    </div>
  );
};

export default JobOrders;
