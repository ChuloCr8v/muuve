import { Button, Empty } from "antd";
import { ProductsDataTypes } from "../../dummy/productsData";
import BillingComponent from "./BillingComponent";
import TierComponent from "./TierComponent";
import NoSelectedProductsMessage from "./NoSelectedProductsMessage";
import { useNavigate } from "react-router-dom";

interface Props {
  selectedProducts: Array<ProductsDataTypes>;
  setSelectedProducts: (arg: ProductsDataTypes[]) => void;
}
const ProductsCustomizationComponent = (props: Props) => {
  const getDuration = localStorage.getItem("duration");
  const duration = getDuration ? JSON.parse(getDuration) : [];

  const navigate = useNavigate();

  if (props.selectedProducts.length === 0) {
    return <Empty description={<NoSelectedProductsMessage />} />;
  }
  return (
    <div className="grid gap-6">
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
            />
          ) : (
            <TierComponent
              key={product.id}
              id={product.id}
              data={product}
              duration={duration}
              selectedProducts={props.selectedProducts}
              setSelectedProducts={props.setSelectedProducts}
            />
          )}
        </div>
      ))}
      <Button
        onClick={() => navigate("/org/onboarding/summary")}
        type="primary"
        className="w-[144px] place-self-end"
      >
        Proceed
      </Button>
    </div>
  );
};

export default ProductsCustomizationComponent;
