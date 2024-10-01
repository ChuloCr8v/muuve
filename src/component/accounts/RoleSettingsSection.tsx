import {
  CloseCircleOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Checkbox, Tooltip } from "antd";
import { ReactNode } from "react";
import TableRowData from "../Global/TableRowData";
import { projectManagementPermissions } from "../../dummy/permissions";

interface Props {
  role: {
    title: string;
    description: ReactNode;
    permissions: number[];
    users: { firstName: string; lastName: string }[];
    reportingTo?: string;
  };
}

const RoleSettingsSection = (props: Props) => {
  const checkSelectedPermissions = (
    permissionId: number,
    permissionIDs: number[]
  ) => {
    return permissionIDs.includes(permissionId);
  };

  // Sort permissions by checked status
  const sortedPermissions = [...projectManagementPermissions].sort((a, b) => {
    const isCheckedA = checkSelectedPermissions(a.id, props.role.permissions);
    const isCheckedB = checkSelectedPermissions(b.id, props.role.permissions);
    return isCheckedA === isCheckedB ? 0 : isCheckedA ? -1 : 1;
  });

  return (
    <div className="role-section w-full flex items-start justify-between gap-12 border-b pb-6">
      <div className="role-info max-w-[600px] w-full space-y-2">
        <TableRowData
          mainText={props.role.title}
          mainTextStyle="font-semibold"
        />
        <p className="text-grey">{props.role.description}</p>

        <div className="flex items-center justify-between">
          <Avatar.Group>
            {props.role.users.map((user, index) => (
              <Tooltip
                title={user.firstName + " " + user.lastName}
                placement="top"
                key={index}
              >
                <Avatar className="bg-green-100 text-green-600 !border-green-600 cursor-pointer">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>

          <Button
            icon={<PlusCircleOutlined />}
            type="link"
            className="text-primary"
          >
            Add member
          </Button>
        </div>
        {props.role?.reportingTo && (
          <TableRowData
            mainText="reporting to"
            tagText={props.role.reportingTo}
            mainTextStyle="font-normal text-grey uppercase text-xs"
            tagTextStyle="font-semibold !text-customBlack capitalize"
          />
        )}
      </div>

      <div className="role-permissions space-y-2  max-w-[500px] w-full">
        <div className="bg-[#379D511F] px-2 py-1 flex items-center justify-between">
          <TableRowData mainText="Permissions" mainTextStyle="font-semibold" />

          <Button type="link" className="text-black" icon={<EditOutlined />}>
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-2 w-full">
          {" "}
          {sortedPermissions.map((permission, index) => (
            <div
              className="permission-item flex items-center mb-2 w-full"
              key={index}
            >
              {checkSelectedPermissions(
                permission.id,
                props.role.permissions
              ) ? (
                <Checkbox
                  checked={checkSelectedPermissions(
                    permission.id,
                    props.role.permissions
                  )}
                />
              ) : (
                <CloseCircleOutlined className="text-red-600 text-base" />
              )}
              <span className="text-grey ml-2">{permission.permission}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSettingsSection;
