import { surveyLogData } from "../../../dummy/surveyLogDummy";
import ProjectLogs from "../ProjectLogs";

const SurveyLog = () => {
  return (
    <div className="space-y-6">
      {surveyLogData.map((item) => (
        <ProjectLogs data={item} />
      ))}
    </div>
  );
};

export default SurveyLog;
