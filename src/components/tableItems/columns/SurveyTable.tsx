import { useDispatch } from "react-redux";
import useProjectColumns from "../../../hooks/useProjectColumns";
import { openProjectDetailsDrawer } from "../../../redux/popupSlice";
import TableComponent from "../../global/TableComponent";
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

      {/* <RejectProjectModal />
      <AssignProjectModal />
      <DeleteProjectModal />
      <PaymentAndReceiptChildren /> */}
    </>
  );
};

export default SurveyTable;
