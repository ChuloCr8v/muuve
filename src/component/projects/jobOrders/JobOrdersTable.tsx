// import Survey from '../../views/projects/Survey';
import { useDispatch } from "react-redux";
import useProjectColumns from "../../../hooks/useProjectColumns";
import { openProjectDetailsDrawer } from "../../../redux/popupSlice";
import TableComponent from "../../Global/TableComponent";
import { jobData } from "../../TableItems/data/JobData";
import AssignProjectModal from "../modals.tsx/AssignProjectModal";
import DeleteProjectModal from "../modals.tsx/DeleteProjectModal";
import RejectProjectModal from "../modals.tsx/RejectProjectModal";
import SignoffProjectModal from "../modals.tsx/SignoffProjectModal";

const JobOrdersTable = () => {
  const dispatch = useDispatch();

  const handleRowClick = (record: any) => {
    dispatch(openProjectDetailsDrawer(record));
  };

  const { projectColumns } = useProjectColumns();

  return (
    <>
      <TableComponent
        columns={projectColumns}
        dataSource={jobData}
        scroll={1000}
        onRow={(record: Array<{}>) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <RejectProjectModal />
      <AssignProjectModal />
      <DeleteProjectModal />
      <SignoffProjectModal />
    </>
  );
};

export default JobOrdersTable;
