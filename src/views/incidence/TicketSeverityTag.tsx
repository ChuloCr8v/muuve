import { BsCircleFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import useTicketSeverityColor from "../../hooks/incidence/useTicketSeverityColor";

type Props = {
  severity: string;
};

const TicketSeverityTag = (props: Props) => {
  const { ticketSeverityColor } = useTicketSeverityColor();

  return (
    <div
      className={twMerge(
        ticketSeverityColor(props.severity),
        "flex items-center gap-2"
      )}
    >
      <BsCircleFill
        className={twMerge(ticketSeverityColor(props.severity), "text-[8px]")}
      />{" "}
      <span className="uppercase">{props.severity}</span>
    </div>
  );
};

export default TicketSeverityTag;
