import { Button, Dropdown } from "antd";
import { BiChevronDown } from "react-icons/bi";
import useJobOrderActionItems from "../../hooks/useJobOrderActionItems";
import useSurveyActionItems from "../../hooks/useSurveyActionItems";

type Props = {
  title?: string;
  currentModule?: string;
  showActionButton?: boolean;
};

const ProjectDetailsDrawerHeading = (props: Props) => {
  const { jobOrderActionItems } = useJobOrderActionItems();
  const { surveyActionItems } = useSurveyActionItems();

  return (
    <div className="my-2">
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{props.title}</h2>
          {props.showActionButton && (
            <Dropdown
              menu={{
                items:
                  props.currentModule?.toLowerCase() === "job order"
                    ? jobOrderActionItems
                    : surveyActionItems,
              }}
            >
              <Button
                className="text-grey"
                iconPosition="end"
                icon={<BiChevronDown />}
              >
                Action
              </Button>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsDrawerHeading;
