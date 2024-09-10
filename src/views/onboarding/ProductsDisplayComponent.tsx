import ProductsCustomizationComponent from "../../component/onboarding/ProductsCustomizationComponent";
import ProductsSelection from "../../component/onboarding/ProductsSelection";

const ProductsDisplayComponent = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 w-full h-screen overflow-hidden">
        <ProductsSelection />
        <ProductsCustomizationComponent />
      </div>
    </div>
  );
};

export default ProductsDisplayComponent;
