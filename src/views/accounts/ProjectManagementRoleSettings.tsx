import { roles } from "../../dummy/roles";
import RoleSettingsSection from "../../component/accounts/RoleSettingsSection";

const ProjectManagementRoleSettings = () => {
  return (
    <div className="px-2 space-y-6">
      {roles.map((role, index) => (
        <RoleSettingsSection key={index} role={role} />
      ))}
    </div>
  );
};

export default ProjectManagementRoleSettings;
