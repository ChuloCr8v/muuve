import { ConfigProvider, Segmented, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsDataTypes, productsData } from "../../dummy/productsData";
import ProductSelectionCard from "./ProductSelectionCard";

const ProductsSelectionComponent = () => {
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

  const getLocallyStoredProducts = localStorage.getItem("selectedProducts");

  const locallyStoredProducts = getLocallyStoredProducts
    ? JSON.parse(getLocallyStoredProducts)
    : [];

  useEffect(() => {
    setSelectedProducts(locallyStoredProducts);
  }, []);

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

export default ProductsSelectionComponent;
