import { JobOrderType, SurveyDataType } from "../../types";

type Props = {
  data?: JobOrderType | SurveyDataType;
};

const DeleteProjectChildren = ({ data }: Props) => {
  return (
    <div>
      <p className="">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{data?.title}</span>. This action cannot
        be undone
      </p>
    </div>
  );
};

export default DeleteProjectChildren;
