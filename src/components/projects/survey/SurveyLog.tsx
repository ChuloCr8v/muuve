import { SurveyLog as Logs } from "../../../api/types";
import ProjectLogItem from "../ProjectLogs";

interface Props {
  logs: Logs[];
}

const SurveyLog = ({ logs }: Props) => {
  return (
    <div>
      {logs.map((log) => (
        <ProjectLogItem log={log} key={log.id} />
      ))}
    </div>
  );
};

export default SurveyLog;
