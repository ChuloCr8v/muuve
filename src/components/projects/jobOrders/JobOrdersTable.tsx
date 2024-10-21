// import Survey from '../../views/projects/Survey';
import useProjectColumns from "../../../hooks/useProjectColumns";
import TableComponent from "../../global/TableComponent";
import { jobData } from "../../tableItems/data/JobData";
import AssignProjectModal from "../modals.tsx/AssignProjectModal";
import DeleteProjectModal from "../modals.tsx/DeleteProjectModal";
import RejectProjectModal from "../modals.tsx/RejectProjectModal";
import SignoffProjectModal from "../modals.tsx/SignoffProjectModal";
import { useAppDispatch } from "../../../api/data";
import { DrawerState, openDrawer } from "../../../redux/popupSlice";

const JobOrdersTable = () => {
  const dispatch = useAppDispatch();

  const handleRowClick = (record: any) => {
    dispatch(
      openDrawer({ isOpen: DrawerState.JOBORDER_DETAILS_DRAWER, id: record.id })
    );
  };

  const { projectColumns } = useProjectColumns();

  return (
    <>
      <TableComponent
        columns={projectColumns as any}
        dataSource={jobData as any}
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
