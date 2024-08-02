import { Checkbox } from "antd";
import { twMerge } from "tailwind-merge";
import ProductIcon from "../../../public/product-icon.png";
import {
  PricingTiersTypes,
  productsData,
  ProductsDataTypes,
} from "../../dummy/productsData";

type Props = {
  selectedProducts: Array<ProductsDataTypes>;
  setSelectedProducts: (arg: Array<ProductsDataTypes>) => void;
  data: { id: string; label: string; pricing: PricingTiersTypes };
  duration: string;
};

const ProductSelectionCard = (props: Props) => {
  //check if product is selected already
  const verifySelectedProducts = (value: string) => {
    const checkIfProductIsCurrentlySelected = props.selectedProducts.find(
      (item) => item.id === value
    );

    return checkIfProductIsCurrentlySelected;
  };

  //Handle product selection
  const handleSelection = (value: string) => {
    if (verifySelectedProducts(value)) {
      console.log(verifySelectedProducts(value));
      //remove it if so
      const updatedSelection = props.selectedProducts.filter(
        (product) => product.id !== value
      );
      props.setSelectedProducts(updatedSelection);
    } else {
      //else add the product if it doesn't already exist
      const product = productsData.find((product) => product.id === value);
      if (product) {
        props.setSelectedProducts([...props.selectedProducts, product]);
      } else {
        return props.selectedProducts;
      }
    }
  };

  //Retrive least price from each duration(Monthly or Yearly)
  const price = (id: string) => {
    const product = productsData.find((product) => product.id === id);
    switch (props.duration) {
      case "monthly":
        return product?.pricing.monthly[0].value;
      case "yearly":
        return (
          product?.pricing.yearly[0].value &&
          product?.pricing.yearly[0].value * 12
        );
      default:
        return product?.pricing.monthly[0].value;
    }
  };

  return (
    <div
      onClick={() => handleSelection(props.data.id)}
      className={twMerge(
        "flex items-center gap-4 border rounded py-5 px-6 w-[400px] bg-white capitalize relative hover:border-primary duration-200 cursor-pointer",
        verifySelectedProducts(props.data.id) && "border-primary"
      )}
      key={props.data.id}
    >
      <img src={ProductIcon} alt={props.data.label} />
      <div className="">
        <p className="font-semibold text-lg">{props.data.label}</p>
        <p className="text-grey">
          Starting from{" "}
          <span className="text-primary font-semibold">
            NGN {price(props.data.id)?.toLocaleString()}
          </span>{" "}
          / {props.duration === "monthly" ? "month" : "year"}
        </p>
      </div>
      <Checkbox
        className="absolute top-2 right-4"
        checked={verifySelectedProducts(props.data.id)?.id === props.data.id}
      />
    </div>
  );
};

export default ProductSelectionCard;
