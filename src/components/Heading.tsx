import { twMerge } from "tailwind-merge";

type Props = { heading: string; className?: string };

const Heading = (props: Props) => {
  return (
    <h2
      className={twMerge(
        "text-center font-semibold capitalize text-3xl",
        props.className
      )}
    >
      {props.heading}{" "}
    </h2>
  );
};

export default Heading;
