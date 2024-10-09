// import { ReactNode } from "react";
// import { useSelector } from "react-redux";
// import SendIcon from "/send.png";
// import { ProductsDataTypes, productsState } from "../types";
// import ProductHeading from "./onboarding/ProductHeading";
// import { twMerge } from "tailwind-merge";
// interface Props {
//   data: ProductsDataTypes;
//   children: ReactNode;
// }

// const SingleProductCustomization = (props: Props) => {
//   const { expandedProductId } = useSelector(
//     (state: productsState) => state.products
//   );

//   return (
//     <div className={twMerge("flex items-center gap-8 overflow-x-hidden")}>
//       <div className={twMerge("grid gap-4 max-w-[480px]")}>
//         <ProductHeading productLabel={props.data.label} id={props.data.id} />

//         {expandedProductId === props.data.id && (
//           <div className="space-y-4">
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <h2 className="text-[#262626] font-semibold text-base">
//                   Overview
//                 </h2>
//                 <p className="text-grey">{props.data.description}</p>
//               </div>
//               <div className="space-y-2">
//                 <h2 className="text-[#262626] font-semibold text-base">
//                   Features
//                 </h2>
//                 <div className="text-grey grid gap-2">
//                   {props.data.features?.map((feature) => (
//                     <div className="flex items-center gap-2" key={feature}>
//                       <img src={SendIcon} alt="miro sm" />
//                       <p className="">{feature}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             {props.children}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SingleProductCustomization;

import React from "react";

type Props = {};

const SingleProductCustomization = (props: Props) => {
  return <div>SingleProductCustomization</div>;
};

export default SingleProductCustomization;
