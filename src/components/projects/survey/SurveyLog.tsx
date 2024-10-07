import { surveyLogData } from "../../../dummy/surveyLogDummy";
import ProjectLogItem from "../ProjectLogs";

const SurveyLog = () => {
  return (
    <div className="">
      {surveyLogData.map((item) => (
        <ProjectLogItem data={item} key={item.id} />
      ))}
    </div>
  );
};

export default SurveyLog;
