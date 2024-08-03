import { Button, Empty } from "antd";
import { ProductsDataTypes } from "../../dummy/productsData";
import NoSelectedProductsMessage from "./NoSelectedProductsMessage";
import BillingComponent from "./BillingComponent";
import SingleProductSummaryCard from "./SingleProductSummaryCard";
import TierComponent from "./TierComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  selectedProducts: Array<ProductsDataTypes>;
  setSelectedProducts: (arg: ProductsDataTypes[]) => void;
}

export interface SelectedProductSummaryType {
  product: string;
  id: number;
  productId: string;
  tierLabel: string;
  tierValue: number;
}

const ProductsCustomizationComponent = (props: Props) => {
  const [selectedProductsSummary, setSelectedProductsSummary] = useState<
    Array<SelectedProductSummaryType>
  >([]);

  const getDuration = localStorage.getItem("duration");
  const duration = getDuration ? JSON.parse(getDuration) : [];

  const navigate = useNavigate();

  //Return empty component if there are no selected products
  if (props.selectedProducts.length === 0) {
    return <Empty description={<NoSelectedProductsMessage />} />;
  }

  //calculate the total of selected products
  const subTotal = selectedProductsSummary.reduce(
    (sum, { tierValue }) => sum + tierValue,
    0
  );

  const handleSubmit = () => {
    localStorage.setItem(
      "selectedProductsSummary",
      JSON.stringify(selectedProductsSummary)
    );
    navigate("/org/onboarding/summary");
  };

  return (
    //Check index.css for extra .tiers className styling
    <div className="flex items-start gap-8 h-full">
      <div className="tiers grid gap-6">
        {props.selectedProducts.map((product) => (
          <div key={product.id}>
            {product.id === "BS" ? (
              <BillingComponent
                data={product}
                duration={duration}
                key={product.id}
                id={product.id}
                selectedProducts={props.selectedProducts}
                setSelectedProducts={props.setSelectedProducts}
                selectedProductsSummary={selectedProductsSummary}
                setSelectedProductsSummary={setSelectedProductsSummary}
              />
            ) : (
              <TierComponent
                key={product.id}
                id={product.id}
                data={product}
                duration={duration}
                selectedProducts={props.selectedProducts}
                setSelectedProducts={props.setSelectedProducts}
                selectedProductsSummary={selectedProductsSummary}
                setSelectedProductsSummary={setSelectedProductsSummary}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-end justify-between h-full">
        <SingleProductSummaryCard subTotal={subTotal} duration={duration} />
        <Button
          disabled={selectedProductsSummary.length === 0}
          onClick={handleSubmit}
          type="primary"
          className="w-[144px] place-self-end"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default ProductsCustomizationComponent;
