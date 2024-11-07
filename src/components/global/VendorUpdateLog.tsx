import { Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaChevronUp, FaCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { VendorUpdate } from "../../api/types";
import AttachmentCard from "./AttachmentCard";

interface Props {
  logs: VendorUpdate[];
}

export const VendorUpdateLog = ({ logs }: Props) => {
  const [closedLogs, setClosedLogs] = useState<Array<string>>([]);

  return (
    <div>
      {logs.map((log) => {
        const toggle = () => {
          setClosedLogs((prev) => {
            if (prev.includes(log.id)) {
              return prev.filter((logId) => logId !== log.id);
            } else {
              return [...prev, log.id];
            }
          });
        };

        return (
          <div className="w-full project-log">
            <div className="flex items-start w-full border-l gap-x-4">
              <FaCircle className="-ml-[5px] mt-7 text-xl rounded-full log-icon text-[#0A96CC]" />
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between pt-6 log-header">
                  <p className="font-semibold capitalize">{log.phase}</p>
                  <div className="flex items-center gap-4 text-grey">
                    <p className="text-sm">
                      {" "}
                      {dayjs().from(log.createdAt, true)} ago
                    </p>
                    <Button
                      className="p-1 border rounded w-fit h-fit"
                      onClick={toggle}
                    >
                      <FaChevronUp
                        className={twMerge(
                          closedLogs.includes(log.id) && "rotate-180"
                        )}
                      />
                    </Button>
                  </div>
                </div>
                <div
                  className={twMerge(
                    "space-y-2",
                    closedLogs.includes(log.id) &&
                      "h-0 overflow-hidden transition-all duration-300 ease-in-out"
                  )}
                >
                  {log.comment && (
                    <div className="p-3 border rounded">{log.comment}</div>
                  )}
                  {log.attachments && (
                    <div className="grid grid-cols-2 gap-3">
                      {log.attachments.uploads.map((up) => (
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
      })}
    </div>
  );
};
