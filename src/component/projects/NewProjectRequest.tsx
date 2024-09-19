import { Drawer, Steps } from "antd";
import ProjectStepComponent from "./ProjectStepComponent";

const NewProjectRequest = () => {
  return (
    <Drawer open title={<ProjectStepComponent current={1} />}>
      <div className=""></div>
    </Drawer>
  );
};

export default NewProjectRequest;
