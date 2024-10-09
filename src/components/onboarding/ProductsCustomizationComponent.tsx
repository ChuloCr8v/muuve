// import { Empty } from "antd";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import EmptyCart from "/empty-cart.png";
// import { productsState } from "../../types";
// import BillingComponent from "./BillingComponent";
// import TierComponent from "./TierComponent";
// import { twMerge } from "tailwind-merge";

// const ProductsCustomizationComponent = () => {
//   const { products, expandedProductId, planUpdateActive } = useSelector(
//     (state: productsState) => state.products
//   );

//   //Return empty component if there are no selected products
//   if (products?.length === 0) {
//     return (
//       <div className=" flex flex-col items-center justify-center">
//         <Empty
//           image={EmptyCart}
//           className="max-w-[300px]"
//           description="To get started, choose your preferred product(s) and select your tier"
//         />
//       </div>
//     );
//   }

//   return (
//     <div
//       className={twMerge(
//         "flex items-center justify-center gap-8 min-h-screen bg-[#F7FCFD] overflow-y-scroll",
//         products?.length > 3 && expandedProductId && "pt-72 pb-20",
//         planUpdateActive && "items-start justify-start"
//       )}
//     >
//       <motion.div
//         layout="position"
//         transition={{ duration: 0.2 }}
//         className="tiers grid gap-6"
//       >
//         {products?.length &&
//           products?.map((product) => (
//             <div key={product.id}>
//               {product.id === "BS" ? (
//                 <BillingComponent
//                   data={product}
//                   key={product.id}
//                   id={product.id}
//                 />
//               ) : (
//                 <TierComponent
//                   key={product.id}
//                   id={product.id}
//                   data={product}
//                 />
//               )}
//             </div>
//           ))}
//       </motion.div>
//     </div>
//   );
// };

// export default ProductsCustomizationComponent;

import React from "react";

type Props = {};

const ProductsCustomizationComponent = (props: Props) => {
  return <div>ProductsCustomizationComponent</div>;
};

export default ProductsCustomizationComponent;
