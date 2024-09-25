// import { Button, Dropdown, MenuProps } from "antd";
// import { BiChevronDown } from "react-icons/bi";
// import useProjectActionItems from "../../hooks/useProjectActionItems";

type Props = {
  title?: string;
  currentModule?: string;
};

const ProjectDetailsDrawerHeading = ({ title }: Props) => {
  // const { jobOrderActionItems, survetyActionItems } = useProjectActionItems();

  return (
    <div className="my-2">
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {/* <Dropdown
            menu={{
              items:
                currentModule?.toLowerCase() === "job order"
                  ? jobOrderActionItems
                  : survetyActionItems,
            }}
          >
            <Button
              className="text-grey"
              iconPosition="end"
              icon={<BiChevronDown />}
            >
              Action
            </Button>
          </Dropdown> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsDrawerHeading;
