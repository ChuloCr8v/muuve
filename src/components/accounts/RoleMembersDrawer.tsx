import { Avatar, Drawer } from "antd";
import TableRowData from "../global/TableRowData";

interface Props {
  users: { firstName: string; lastName: string }[];
  title: string;
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}

const RoleMembersDrawer = (props: Props) => {
  return (
    <Drawer
      title={props.title}
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
    >
      <div className="space-y-4">
        <TableRowData
          mainText={props.users.length + " " + "members"}
          mainTextStyle="!font-semibold text-base"
        />
        <div className="space-y-2">
          {props.users?.map((user) => (
            <div className="flex items-center gap-2">
              <Avatar>
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </Avatar>
              {user.firstName} {user.lastName}
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default RoleMembersDrawer;
