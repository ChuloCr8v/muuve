import { CaretDownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { User } from "../../api/types";
import { useLogoutMutation } from "../../api/auth.api";
import { useAuthState } from "../../api/data/auth";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";

interface Props {
  user: User;
}

export default function Account({ user }: Props) {
  const name = user.staff
    ? user.staff.name
    : user.customer
    ? user.customer.name
    : user.vendor.spocName;

  const [logout] = useLogoutMutation();
  const authState = useAuthState();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    authState.clear();
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <div className="flex items-center space-x-[16px]">
          <Avatar className="bg-[#EFF7FB] font-semibold text-[#0A96CC]">
            {getInitials(name)}
          </Avatar>
          <div className="w-fit">
            <p className="text-[12px] text-[#262626] font-semibold">
              {getInitials(name)}
            </p>
            <p className="text-[10px] text-[#262626]">Admin</p>
          </div>
        </div>
      ),
    },
    {
      key: 2,
      label: "Settings",
      onClick: () => navigate("/account/settings"),
    },
    {
      key: 3,
      label: "Reset Password",
    },
    {
      key: 4,
      label: "Sign Out",
      onClick: () => onLogout(),
    },
  ];
  return (
    <Dropdown menu={{ items }} className="cursor-pointer">
      <div className="flex items-center space-x-[16px] w-fit">
        {name && (
          <Avatar className="bg-[#EFF7FB] font-semibold  text-[#0A96CC]">
            {getInitials(name || "")}
          </Avatar>
        )}
        <div className="flex items-center space-x-3">
          <span className="text-[12px] font-semibold text-[#262626] w-fit">
            {name}
          </span>
          <CaretDownOutlined
            className={`text-[12px] text-[#777777] transform`}
          />
        </div>
      </div>
    </Dropdown>
  );
}
