import { useState } from "react";
import PageHeader from "../../component/Global/PageHeader";
import SummaryCards from "../../component/Global/SummaryCards";
import JobDetailsDrawer from "../../component/projects/jobOrders/JobDetailsDrawer";
import JobOrdersTable from "../../component/projects/jobOrders/JobOrdersTable";
import NewJobOrderForm from "../../component/projects/jobOrders/NewJobOrderForm";

const JobOrders = () => {
  const [newJobOrder, setNewJobOrder] = useState(false);

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

  return (
    <div className="space-y-3">
      <PageHeader
        heading={"Job Orders"}
        onclick={() => setNewJobOrder(true)}
        handleRefresh={() => console.log("first")}
        handleGenerateReport={() => console.log("first")}
      />

      <SummaryCards summaryData={summaryData} />
      <JobOrdersTable />

      {/* job details drawer */}
      <JobDetailsDrawer />

      {/* New job form */}
      <NewJobOrderForm open={newJobOrder} setOpen={setNewJobOrder} />
    </div>
  );
};

export default JobOrders;
