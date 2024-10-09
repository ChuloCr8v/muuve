import dayjs from "dayjs";

const useFormatDate = () => {
  const formatDate = (date?: number) => {
    return dayjs(date).format("MMMM DD, YYYY");
  };
  return { formatDate };
};

export default useFormatDate;
