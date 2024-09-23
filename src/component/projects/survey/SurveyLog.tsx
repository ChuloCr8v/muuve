import { surveyLogData } from "../../../dummy/surveyLogDummy";
import SurveyLogItem from "./SurveyLogItem";

const SurveyLog = () => {
  return (
    <div className="space-y-6">
      {surveyLogData.map((item) => (
        <SurveyLogItem data={item} />
      ))}
    </div>
  );
};

export default SurveyLog;
