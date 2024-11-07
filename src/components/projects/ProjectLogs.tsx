import { Button } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import { FaChevronUp } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { Log } from "../../api/types";
import AttachmentCard from "../global/AttachmentCard";

type Props = {
  log: Log;
};

dayjs.extend(relativeTime);

const ProjectLogItem = ({ log: logs }: Props) => {
  const [closedLogs, setClosedLogs] = useState<Array<string>>([]);
  const {
    action,
    toStaff,
    toVendor,
    byStaff,
    comment,
    attachments,
    createdAt,
    id,
  } = logs;

  const toggle = () => {
    setClosedLogs((prev) => {
      if (prev.includes(id)) {
        return prev.filter((logId) => logId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="w-full project-log">
      <div className="flex items-start w-full border-l gap-x-4">
        <FaCircle className="-ml-[5px] mt-7 text-xl rounded-full log-icon text-[#0A96CC]" />
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between pt-6 log-header">
            <p className="font-semibold capitalize">{action}</p>
            <div className="flex items-center gap-4 text-grey">
              <p className="text-sm"> {dayjs().from(createdAt, true)} ago</p>
              <Button
                className="p-1 border rounded w-fit h-fit"
                onClick={toggle}
              >
                <FaChevronUp
                  className={twMerge(closedLogs.includes(id) && "rotate-180")}
                />
              </Button>
            </div>
          </div>

          <p className="flex items-center gap-1 text-grey">
            by{" "}
            <span className="font-medium text-primary">
              {byStaff.staff.name}{" "}
            </span>
            {(toStaff || toVendor) && <CgArrowRight />}{" "}
            <span className="font-medium text-primary">
              {toStaff && toStaff.staff.name}
              {toVendor &&
                `${toVendor.vendor.companyName} | ${toVendor.vendor.spocName}`}
            </span>
          </p>
          <div
            className={twMerge(
              "space-y-2",
              closedLogs.includes(id) &&
                "h-0 overflow-hidden transition-all duration-300 ease-in-out"
            )}
          >
            {comment && <div className="p-3 border rounded">{comment}</div>}
            {attachments && (
              <div className="grid grid-cols-2 gap-3">
                {attachments.uploads.map((up) => (
                  <AttachmentCard
                    id={up.id}
                    name={up.name}
                    size={up.size}
                    key={up.key}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLogItem;
