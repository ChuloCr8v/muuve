import ActionPopup from "../../component/Global/ActionPopup";
import { useDispatch, useSelector } from "react-redux";
import { closeTicketActionModal } from "../../redux/popupSlice";
import { popupInterface } from "../../types";
import useGetSingleTicket from "../../hooks/incidence/useGetSingleTicket";
import { FaRegTrashAlt } from "react-icons/fa";

const ResolveTicketModal = () => {
  const { ticketActionModalIsOpen } = useSelector(
    (state: popupInterface) => state.popups
  );

  const { isOpen, ticketID, action } = ticketActionModalIsOpen;

  const { ticket } = useGetSingleTicket(ticketID);

  const dispatch = useDispatch();

  const handleResolveTicket = () => {
    dispatch(closeTicketActionModal());
  };

  return (
    <ActionPopup
      open={isOpen && action?.toLowerCase() === "resolve ticket"}
      onCancel={() => dispatch(closeTicketActionModal())}
      onOk={handleResolveTicket}
      title={"Resolve Ticket"}
      icon={<FaRegTrashAlt />}
      sendButtonText={"Resolve"}
    >
      <p className="">
        Are you sure you want to resolve{" "}
        <span className="">{ticket?.subject}</span> by {ticket?.customer}
      </p>
    </ActionPopup>
  );
};

export default ResolveTicketModal;
