import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const formatTimeLeft = (slaTime: number) => {
  const currentTime = new Date();
  const sla = new Date(slaTime);

  const timeDiff = sla.getTime() - currentTime.getTime();

  const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return dayDifference;
};

const SLATime = ({ sla, status }: { sla: number; status: string }) => {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(sla));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(sla));
    }, 60000);

    return () => clearInterval(timer);
  }, [sla]);

  return (
    <div>
      <p className="">
        SLA:{" "}
        <span
          className={twMerge(
            status.toLowerCase() === "completed"
              ? "text-grey"
              : "text-green-600",
            timeLeft <= 2 && "text-red-600"
          )}
        >
          {timeLeft <= 0 ? "0" : timeLeft} work days
        </span>
      </p>
    </div>
  );
};

export default SLATime;
