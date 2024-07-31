import { Button, Checkbox, ConfigProvider, Segmented } from "antd";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import ProductIcon from "../../../public/product-icon.png";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { productsData } from "../../dummy/productsData";

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
  const [selectedProducts, setSelectedProducts] = useState<Array<string>>([]);

  const handleSelection = (value: string) => {
    if (selectedProducts.includes(value)) {
      const updatedSelection = selectedProducts.filter(
        (product) => product !== value
      );
      setSelectedProducts(updatedSelection);
    } else {
      setSelectedProducts([...selectedProducts, value]);
    }
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
            console.log(duration);
          }}
          options={["Billed monthly", "Billed yearly"]}
        />
      </ConfigProvider>
      <div className="grid grid-cols-2 gap-6">
        {productsData.map((product) => (
          <div
            onClick={() => handleSelection(product.label)}
            className={twMerge(
              "flex items-center gap-4 border rounded py-5 px-6 w-[400px] bg-white capitalize relative hover:border-primary duration-200 cursor-pointer",
              selectedProducts.includes(product.label) && "border-primary"
            )}
            key={product.label}
          >
            <img src={ProductIcon} alt={product.label} />
            <div className="">
              <p className="font-semibold text-lg">{product.label}</p>
              <p className="text-grey">
                Starting from{" "}
                <span className="text-primary font-semibold">
                  NGN{" "}
                  {duration === "monthly"
                    ? product.monthly.toLocaleString()
                    : product.yearly.toLocaleString()}
                </span>{" "}
                / {duration === "monthly" ? "month" : "year"}
              </p>
            </div>
            <Checkbox
              className="absolute top-2 right-4"
              checked={selectedProducts.includes(product.label)}
            />
          </div>
        ))}
      </div>
      <Button
        className="place-self-end w-[144px]"
        type="primary"
        disabled={!selectedProducts.length}
      >
        Proceed
      </Button>
    </div>
  );
};
