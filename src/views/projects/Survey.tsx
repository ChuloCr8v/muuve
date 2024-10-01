import { useState } from "react";
import PageHeader from "../../component/Global/PageHeader";
import SummaryCards from "../../component/Global/SummaryCards";
import FormPopup from "../../component/Global/FormPopup";
import SurveyDetailsDrawer from "../../component/projects/survey/SurveyDetailsDrawer";
import SurveyTable from "../../component/TableItems/columns/SurveyTable";

const Survey = () => {
  const [newSurvey, setNewSurvey] = useState(false);

  const summaryData = [
    {
      label: "Total",
      value: 22,
    },
    {
      label: "Active",
      value: 19,
    },
    {
      label: "Deactivated",
      value: 2,
    },
    {
      label: "Expiring",
      value: 1,
    },
  ];

  return (
    <div className="space-y-3 p-8">
      <PageHeader
        heading={"Surveys"}
        onclick={() => setNewSurvey?.(true)}
        handleRefresh={() => console.log("first")}
        handleGenerateReport={() => console.log("first")}
      />

      <SummaryCards summaryData={summaryData} />
      <SurveyTable />

      {/* New survey form */}
      <FormPopup
        title={"New Survey Request"}
        open={newSurvey}
        close={() => setNewSurvey(false)}
        submitText={"Submit"}
      />

      {/* survey details drawer */}
      <SurveyDetailsDrawer />
    </div>
  );
};

export default Survey;
