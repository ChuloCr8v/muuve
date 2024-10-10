import dayjs, { Dayjs } from "dayjs";

const useFormatDate = () => {
  const formatDate = (date?: Dayjs) => {
    return dayjs(date).format("MMMM DD, YYYY");
  };
  return { formatDate };
};

export default useFormatDate;
