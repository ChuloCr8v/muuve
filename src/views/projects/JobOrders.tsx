import PageHeader from "../../components/global/PageHeader";
import SummaryCards from "../../components/global/SummaryCards";
import JobDetailsDrawer from "../../components/projects/jobOrders/JobDetailsDrawer";
import JobOrdersTable from "../../components/projects/jobOrders/JobOrdersTable";
import NewJobOrderForm from "../../components/projects/jobOrders/NewJobOrderForm";
import { useDispatch } from "react-redux";
import { DrawerState, openDrawer } from "../../redux/popupSlice";

const JobOrders = () => {
  const dispatch = useDispatch();
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
    <div className="space-y-3 p-8">
      <PageHeader
        heading={"Job Orders"}
        onclick={() =>
          dispatch(openDrawer({ isOpen: DrawerState.NEW_JOBORDER_DRAWER }))
        }
        handleRefresh={() => console.log("first")}
        handleGenerateReport={() => console.log("first")}
      />

      <SummaryCards summaryData={summaryData} />
      <JobOrdersTable />

      {/* job details drawer */}
      <JobDetailsDrawer />

      {/* New job form */}
      <NewJobOrderForm />
    </div>
  );
};

export default JobOrders;
