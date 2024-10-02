import { useState, useEffect } from "react";

const TimeLeft = ({ date, status }: { date: number; status: string }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(new Date().getTime() / 1000);
      const targetTime = date;
      const timeDiff = targetTime - now;
      if (timeDiff <= 0) {
        setTimeLeft("0");
        return;
      }

      const hours = Math.floor(timeDiff / 3600);
      const minutes = Math.floor((timeDiff % 3600) / 60);
      setTimeLeft(
        `${hours.toString().padStart(2, "0")}h:${minutes
          .toString()
          .padStart(2, "0")}m`
      );

      console.log(status);
    };

    calculateTimeLeft();

    const intervalId = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  return <div>{timeLeft}</div>;
};

export default TimeLeft;
