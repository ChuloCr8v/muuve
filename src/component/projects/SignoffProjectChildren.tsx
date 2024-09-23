import { JobOrderType } from "../../types";

type Props = {
  data?: JobOrderType;
};

const SignoffProjectChildren = ({ data }: Props) => {
  return (
    <div>
      <p className="pt-4">
        Sign off <span className="font-semibold">{data?.title}</span>.
      </p>
    </div>
  );
};

export default SignoffProjectChildren;
