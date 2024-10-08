type Props = {
  date: number;
};

const TimeDifference = (props: Props) => {
  function calculateTimeDifference() {
    const currentTime = Date.now();

    const timeDifference = Math.abs(props.date - currentTime);

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours}h:${minutes.toString().padStart(2, "0")}m`;
  }

  return <div className="text-primarygreen">{calculateTimeDifference()}</div>;
};

export default TimeDifference;
