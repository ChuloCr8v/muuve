import { Avatar } from "antd";

type Props = {
  firstName: string;
  lastName: string;
  showFullName?: boolean;
};

const UserAvatar = (props: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <span className="">
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
