import { useEffect, useState } from "react";
import { User } from "../api/types";
import { useListCustomersQuery } from "../api/customer.api";

type Props = {
  customerId: string;
};

const useGetSingleCustomer = (props: Props) => {
  const [customer, setCustomer] = useState<User>();

  const listStaff = useListCustomersQuery();
  const { data, isLoading, isFetching } = listStaff;

  useEffect(() => {
    const getStaff = data?.find((customer) => customer.id === props.customerId);
    setCustomer(getStaff);
  }, [props.customerId]);

  return { customer, isLoading, isFetching };
};

export default useGetSingleCustomer;
