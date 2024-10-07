import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NoSelectedProductsMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="">You currently have no products in your cart</p>
      <Button
        type="primary"
        className=" w-[144px]"
        onClick={() => navigate("/org/onboarding/products")}
      >
        Select Products
      </Button>
    </div>
  );
};

export default NoSelectedProductsMessage;
