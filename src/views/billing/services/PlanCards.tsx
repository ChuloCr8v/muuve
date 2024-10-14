import { FaRegCheckCircle } from "react-icons/fa";
import { PlanDataType } from "../../../types";

interface Props {
  plans: Array<PlanDataType>;
  billingCycle: string;
}

const Planplans = (props: Props) => {
  console.log(props.plans);

  return (
    <div className="grid grid-cols-3 gap-6 mt-2">
      {props.plans?.map((plan) => (
        <div
          className="max-w-[400px] border border-input_border rounded-[8px] bg-white"
          key={plan.tierName}
        >
          <div className="flex flex-col items-start gap-3 p-4 border-b border-input_border">
            <h2 className="text-xl font-semibold">{plan.label}</h2>
            <p className="text-sm text-grey">{plan.description}</p>
            <p className="text-[24px] text-label_black font-bold">
              NGN {plan.price.toLocaleString()}
              <span className="text-sm font-normal text-grey">
                /{props.billingCycle === "monthly" ? "month" : "year"}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 p-4">
            {plan.features?.map((feature) => (
              <div className="flex items-center gap-2" key={feature}>
                <FaRegCheckCircle className="text-base text-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Planplans;
