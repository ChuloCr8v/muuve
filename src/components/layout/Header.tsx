import { MenuFoldOutlined } from "@ant-design/icons";
import Account from "./Account";
import { Link } from "react-router-dom";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useGetAuthUserQuery } from "../../api/auth.api";
import { Spin } from "antd";

interface Prop {
  setCollapse: any;
  collapse: boolean;
  open: any;
}

export default function Header(props: Prop) {
  const { data, isLoading } = useGetAuthUserQuery();

  const { setCollapse, collapse, open } = props;
  const [selectedMenu, setSelectedMenu] = useState<any | null>(null);

  const handleChange = (record: any) => {
    setSelectedMenu(record);
  };

  const menuList = [
    {
      label: "Configuration",
      url: "/admin/config",
    },
  ];

  return (
    <header className="flex items-center justify-between w-full px-2 ">
      <div className="flex items-center gap-x-4 ">
        <MenuFoldOutlined
          onClick={() => setCollapse(!collapse)}
          className="hidden md:flex text-xl hover:text-[#0A96CC]"
        />
        <MenuFoldOutlined
          onClick={() => open(true)}
          className="md:hidden flex text-xl hover:text-[#0A96CC]"
        />
      </div>
      <div className="flex items-center justify-end space-x-4 w-fit">
        {data?.isAdmin &&
          menuList.map((list, idx) => {
            const CurrentPage = list.url;
            return (
              <Link to={list.url} key={idx}>
                <span
                  onClick={() => handleChange(CurrentPage)}
                  className={twMerge(
                    selectedMenu === CurrentPage
                      ? "text-primary font-semibold "
                      : "text-[#595959]",
                    "text-[13px] "
                  )}
                >
                  {list.label}
                </span>
              </Link>
            );
          })}

        {!isLoading && data ? <Account user={data} /> : <Spin />}
      </div>
    </header>
  );
}
