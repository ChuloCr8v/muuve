import ProductsCustomizationComponent from "../../components/onboarding/ProductsCustomizationComponent";
import ProductsSelection from "../../components/onboarding/ProductsSelection";

const ProductsDisplayComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="grid w-full h-screen grid-cols-2 overflow-hidden">
        <ProductsSelection />
        <ProductsCustomizationComponent />
      </div>
    </div>
  );
};

export default ProductsDisplayComponent;
