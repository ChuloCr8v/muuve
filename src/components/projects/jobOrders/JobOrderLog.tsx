import { surveyLogData } from "../../../dummy/surveyLogDummy";
import ProjectLogs from "../ProjectLogs";

const SurveyLog = () => {
  return (
    <div className="">
      {surveyLogData.map((item) => (
        <ProjectLogs data={item} key={item.id} />
      ))}
    </div>
  );
};

export default SurveyLog;
