import { ReactNode } from "react";

const FormHeading = (props: {
  heading: string;
  subheading: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  steps?: boolean;
}) => {
  return (
    <div className="grid gap-2">
      {props.steps && (
        <p className="text-grey">
          Step {props.currentStep} of {props.totalSteps}
        </p>
      )}
      <p className="text-2xl font-semibold">{props.heading}</p>
      <p className="text-sm text-gray">{props.subheading}</p>
    </div>
  );
};

export default FormHeading;
