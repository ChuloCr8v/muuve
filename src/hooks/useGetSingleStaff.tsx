import { useEffect, useState } from "react";
import { useListStaffQuery } from "../api/staff.api";
import { User } from "../api/types";

type Props = {
  staffId: string;
};

const useGetSingleStaff = (props: Props) => {
  const [staff, setStaff] = useState<User>();

  const listStaff = useListStaffQuery();
  const staffUsers = listStaff.data ?? [];

  useEffect(() => {
    const getStaff = staffUsers.find((staff) => staff.id === props.staffId);
    setStaff(getStaff);
  }, [props.staffId]);

  return { staff };
};

export default useGetSingleStaff;
