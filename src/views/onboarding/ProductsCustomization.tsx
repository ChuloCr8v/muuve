import { Button } from "antd";
import { useEffect, useState } from "react";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import TierComponent from "../../component/onboarding/TierComponent";
import { productsData, ProductsDataTypes } from "../../dummy/productsData";
import BillingComponent from "../../component/onboarding/BillingComponent";

const ProductsCustomization = () => {
  return (
    <div>
      <OnboardingLayout
        steps
        currentStep={4}
        totalSteps={5}
        children={<Children />}
        heading={"Customize your products"}
        subheading={"You can customize your selected products"}
      />
    </div>
  );
};

export default ProductsCustomization;

const Children = () => {
  const [selectedProducts, setSetSelectedProducts] = useState<
    Array<ProductsDataTypes>
  >([]);

  const getProducts = localStorage.getItem("selectedProducts");
  const products = getProducts ? JSON.parse(getProducts) : [];
  const getDuration = localStorage.getItem("duration");
  const duration = getDuration ? JSON.parse(getDuration) : [];

  useEffect(() => {
    setSetSelectedProducts(products);
  }, []);

  console.log(selectedProducts);

  return (
    <div className="grid gap-6">
      {selectedProducts.map((product) => (
        <>
          {product.id === "BS" ? (
            <BillingComponent data={product} duration={duration} />
          ) : (
            <TierComponent
              key={product.id}
              data={product}
              duration={duration}
            />
          )}
        </>
      ))}
      <Button type="primary" className="w-[144px] place-self-end">
        Proceed
      </Button>
    </div>
  );
};
