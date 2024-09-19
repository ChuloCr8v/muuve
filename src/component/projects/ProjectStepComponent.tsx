import { Steps } from "antd";

type Props = {
  current: number;
};

const ProjectStepComponent = ({ current }: Props) => {
  return (
    <div>
      <Steps
        current={current}
        items={[
          {
            title: "",
          },
          {
            title: "",
            description: "This is a description.",
          },
          {
            title: "Waiting",
            description: "This is a description.",
          },
        ]}
      />
    </div>
  );
};

export default ProjectStepComponent;
