import { useDispatch } from "react-redux";
import useProjectColumns from "../../../hooks/useProjectColumns";
import { openProjectDetailsDrawer } from "../../../redux/popupSlice";
import TableComponent from "../../Global/TableComponent";
import AssignProjectModal from "../../projects/modals.tsx/AssignProjectModal";
import DeleteProjectModal from "../../projects/modals.tsx/DeleteProjectModal";
import PaymentAndReceiptChildren from "../../projects/modals.tsx/PaymentAndReceiptModal";
import RejectProjectModal from "../../projects/modals.tsx/RejectProjectModal";
import { SurveyData } from "../data/SurveyData";

const SurveyTable = () => {
  const { projectColumns } = useProjectColumns("survey");

  const dispatch = useDispatch();

  const handleRowClick = (record: any) => {
    dispatch(openProjectDetailsDrawer(record));
  };

  return (
    <>
      <TableComponent
        columns={projectColumns}
        dataSource={SurveyData}
        scroll={800}
        onRow={(record: Array<{}>) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <RejectProjectModal />
      <AssignProjectModal />
      <DeleteProjectModal />
      <PaymentAndReceiptChildren />
    </>
  );
};

export default SurveyTable;
