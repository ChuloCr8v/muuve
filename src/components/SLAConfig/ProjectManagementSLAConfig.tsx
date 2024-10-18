import SLAComponent from "./SLAComponent";
interface Props {
  currentItem: string;
  setCurrentItem: (arg: string) => void;
}
const ProjectManagementSLAConfig = (props: Props) => {
  return (
    <div>
      <SLAComponent
        currentItem={props.currentItem}
        setCurrentItem={props.setCurrentItem}
      />
    </div>
  );
};

export default ProjectManagementSLAConfig;
