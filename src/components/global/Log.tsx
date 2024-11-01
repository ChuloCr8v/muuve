import { Log } from "../../api/types";
import ProjectLogItem from "../projects/ProjectLogs";

interface Props {
  logs: Log[];
}

const LogComponent = ({ logs }: Props) => {
  return (
    <div>
      {logs.map((log) => (
        <ProjectLogItem log={log} key={log.id} />
      ))}
    </div>
  );
};

export default LogComponent;
