import { Button, ConfigProvider, Segmented } from "antd";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import { useState } from "react";
import { productsData, ProductsDataTypes } from "../../dummy/productsData";
import { useNavigate } from "react-router-dom";
import ProductSelectionCard from "../../component/onboarding/ProductSelectionCard";

const ProductsSelection = () => {
  return (
    <div>
      <OnboardingLayout
        children={<Children />}
        heading={"What products are you interested in?"}
        subheading={"You can select as much products as you want"}
        steps
        totalSteps={5}
        currentStep={3}
      />
    </div>
  );
};

export default ProductsSelection;

const Children = () => {
  const [duration, setDuration] = useState("monthly");
  const [selectedProducts, setSelectedProducts] = useState<
    Array<ProductsDataTypes>
  >([]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    localStorage.setItem("duration", JSON.stringify(duration));
    navigate(`/org/onboarding/customize-products`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemSelectedBg: "#0A96CC",
              itemSelectedColor: "white",
              itemHoverColor: "white",
            },
          },
        }}
      >
        <Segmented
          itemProp="text-red-600"
          defaultValue="Billed monthly"
          style={{ marginBottom: 8 }}
          className="rounded-full"
          onChange={(value) => {
            setDuration(value.slice(7));
          }}
          options={["Billed monthly", "Billed yearly"]}
        />
      </ConfigProvider>
      <div className="grid grid-cols-2 gap-6">
        {productsData.map((product) => (
          <ProductSelectionCard
            key={product.id}
            duration={duration}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            data={product}
          />
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="place-self-end w-[144px]"
        type="primary"
        disabled={!selectedProducts.length}
      >
        Proceed
      </Button>
    </div>
  );
};
