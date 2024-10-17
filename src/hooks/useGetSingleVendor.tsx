import { useEffect, useState } from "react";
import { User } from "../api/types";
import { useListVendorQuery } from "../api/vendor";

type Props = {
  vendorId: string;
};

const useGetSingleVendor = (props: Props) => {
  const [vendor, setVendor] = useState<User>();
  console.log(vendor);

  const listStaff = useListVendorQuery();
  const { data, isLoading, isFetching } = listStaff;

  useEffect(() => {
    const getVendor = data?.find((vendor) => vendor.id === props.vendorId);
    setVendor(getVendor);
  }, [props.vendorId]);

  return { vendor, isLoading, isFetching };
};

export default useGetSingleVendor;
