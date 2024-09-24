import { useState } from "react";
import SurveyTable from "../../component/data/SurveyTable";
import PageHeader from "../../component/Global/PageHeader";
import SummaryCards from "../../component/Global/SummaryCards";
import SurveyDetailsDrawer from "../../component/projects/survey/SurveyDetailsDrawer";
import { SurveyDataType } from "../../types";
import FormPopup from "../../component/Global/FormPopup";

const Survey = () => {
  const [newSurvey, setNewSurvey] = useState(false);
  const [surveyDetailsIsOpen, setSurveyDetailsIsOpen] = useState<{
    isOpen: boolean;
    data: SurveyDataType | null;
  }>({ isOpen: false, data: null });

  const closeDrawer = () => {
    setSurveyDetailsIsOpen((prev) => ({ ...prev, isOpen: false }));
  };

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
    <div className="space-y-3">
      <PageHeader
        heading={"Surveys"}
        onclick={() => setNewSurvey?.(true)}
        handleRefresh={() => console.log("first")}
        handleGenerateReport={() => console.log("first")}
      />

      <SummaryCards summaryData={summaryData} />
      <SurveyTable setSurveyDetailsIsOpen={setSurveyDetailsIsOpen} />

      {/* New survey form */}
      <FormPopup
        title={"New Survey Request"}
        open={newSurvey}
        close={() => setNewSurvey(false)}
        submitText={"Submit"}
      />

      {/* survey details drawer */}
      <SurveyDetailsDrawer
        data={surveyDetailsIsOpen.data}
        isOpen={surveyDetailsIsOpen.isOpen}
        onclose={closeDrawer}
      />
    </div>
  );
};

export default Survey;
