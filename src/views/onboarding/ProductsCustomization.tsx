import { useEffect, useState } from "react";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import ProductsCustomizationComponent from "../../component/onboarding/ProductsCustomizationComponent";
import { ProductsDataTypes } from "../../dummy/productsData";

const ProductsCustomization = () => {
  const [selectedProducts, setSelectedProducts] = useState<
    Array<ProductsDataTypes>
  >([]);

  const getProducts = localStorage.getItem("selectedProducts");
  const products = getProducts ? JSON.parse(getProducts) : [];

  useEffect(() => {
    setSelectedProducts(products);
  }, []);

  return (
    <div>
      <OnboardingLayout
        steps={selectedProducts.length > 0}
        currentStep={selectedProducts.length && 4}
        totalSteps={selectedProducts.length && 5}
        children={
          <ProductsCustomizationComponent
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        }
        heading={"Customize your products"}
        subheading={
          selectedProducts.length > 0
            ? "You can customize your selected products"
            : ""
        }
      />
    </div>
  );
};

export default ProductsCustomization;
