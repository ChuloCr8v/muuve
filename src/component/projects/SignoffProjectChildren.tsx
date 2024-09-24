import { JobOrderType } from "../../types";

type Props = {
  data?: JobOrderType;
};

const SignoffProjectChildren = ({ data }: Props) => {
  return (
    <div>
      <p className="">
        Sign off <span className="font-semibold">{data?.title}</span>.
      </p>
    </div>
  );
};

export default SignoffProjectChildren;
