import { Avatar } from "antd";
// import { Avatar } from "antd";
// import dummyDP from "/assets/dp.png";

type Props = {
  firstName: string;
  lastName: string;
  showFullName?: boolean;
  size?: number;
};

const UserAvatar = (props: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar size={props.size}>
        <span className="uppercase">
          {props.firstName?.charAt(0)}
          {props.lastName?.charAt(0)}
        </span>
      </Avatar>
      {props.showFullName ? (
        <p className="">
          {props?.firstName} {props?.lastName}
        </p>
      ) : null}
    </div>
  );
};

export default UserAvatar;
