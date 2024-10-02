import { CaretDownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

export default function Account(props: { user: string; role: string }) {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <div className="flex items-center space-x-[16px]">
          <Avatar className="bg-[#EFF7FB] font-semibold text-[#0A96CC]">
            {props.user.slice(0, 1)}
          </Avatar>
          <div className="w-fit">
            <p className="text-[12px] text-[#262626] font-semibold">
              {props.user}
            </p>
            <p className="text-[10px] text-[#262626]">{props.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: 2,
      label: "Account",
      onClick: () => navigate("/account/settings"),
    },
    {
      key: 3,
      label: "Reset Password",
    },
    {
      key: 4,
      label: "Sign Out",
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <div className="flex items-center space-x-[16px] w-fit">
        <Avatar className="bg-[#EFF7FB] font-semibold  text-[#0A96CC]">
          {props.user.slice(0, 1)}
        </Avatar>
        <div className="flex space-x-3 items-center">
          <span className="text-[12px] font-semibold text-[#262626] w-fit">
            {props.user}
          </span>
          <CaretDownOutlined
            className={`text-[12px] text-[#777777] transform`}
          />
        </div>
      </div>
    </Dropdown>
  );
}
