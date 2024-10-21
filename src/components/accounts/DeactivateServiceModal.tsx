// import { useDispatch, useSelector } from "react-redux";
// import ActionPopup from "../global/ActionPopup";
// import { closeDeactivateServiceModal } from "../../redux/popupSlice";

// interface deactivateServiceModalInterface {
//   popups: {
//     deactivateServiceModalIsOpen: {
//       isOpen?: boolean;
//       data?: { moduleTitle: string };
//     };
//   };
// }

// const DeactivateServiceModal = () => {
//   const { deactivateServiceModalIsOpen } = useSelector(
//     (state: deactivateServiceModalInterface) => state.popups
//   );

//   const { isOpen, data } = deactivateServiceModalIsOpen;
//   const dispatch = useDispatch();

//   console.log(isOpen);

//   return (
//     <ActionPopup
//       open={isOpen}
//       onCancel={() => dispatch(closeDeactivateServiceModal())}
//       title={"Deactivate Service"}
//       sendButtonText={"Deactivate"}
//       sendButtonStyle="bg-red-600 hover:bg-red-600"
//     >
//       <p className="">
//         Are you sure you want to deactivate subscription for<br></br>{" "}
//         <span className="font-semibold capitalize">{data?.moduleTitle}</span>
//       </p>
//     </ActionPopup>
//   );
// };

// export default DeactivateServiceModal;

const DeactivateServiceModal = () => {
  return <div>DeactivateServiceModal</div>;
};

export default DeactivateServiceModal;
