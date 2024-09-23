import { Button, Dropdown, MenuProps } from "antd";
import { BiChevronDown } from "react-icons/bi";

type Props = {
  title?: string;
};

const ProjectDetailsDrawerHeading = ({ title }: Props) => {
  const actionItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
  ];

  return (
    <div className="-mt-2 mb-2">
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Dropdown menu={{ items: actionItems }}>
            <Button
              className=" text-grey"
              iconPosition="end"
              icon={<BiChevronDown />}
            >
              Action
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsDrawerHeading;
