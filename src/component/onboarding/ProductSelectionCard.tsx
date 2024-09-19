import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import ProductIcon from "../../../public/product-icon.png";
import { productsData } from "../../dummy/productsData";
import { addProduct, expandProductDetatails } from "../../redux/productsSlice";
import { ProductsDataTypes, productsState } from "../../types";

type Props = {
  data: ProductsDataTypes;
};

const ProductSelectionCard = (props: Props) => {
  const { products, duration } = useSelector(
    (state: productsState) => state.products
  );

  const dispatch = useDispatch();

  //check if product is selected already
  const verifySelectedProducts = (id: string) => {
    const checkIfProductIsCurrentlySelected = products.find(
      (product) => product.id === id
    );

    return checkIfProductIsCurrentlySelected;
  };

  //Retrive least price from each duration(Monthly or Yearly)
  const price = (id: string) => {
    const product = productsData.find((product) => product.id === id);
    switch (duration) {
      case "monthly":
        return product?.pricing?.monthly[0].value;
      case "yearly":
        return (
          product?.pricing?.yearly[0].value && product?.pricing.yearly[0].value
        );
      default:
        return product?.pricing?.monthly[0].value;
    }
  };
  return (
    <div
      onClick={() => {
        dispatch(expandProductDetatails(props.data.id));
        dispatch(addProduct(props.data));
      }}
      className={twMerge(
        "flex flex-col items-start gap-4 border rounded p-5 w-[280px] bg-white capitalize relative hover:border-primary duration-200 cursor-pointer",
        verifySelectedProducts(props.data.id) && "border-primary"
      )}
      key={props.data.id}
    >
      <img src={ProductIcon} alt={props.data.label} className="h-12 w-12" />
      <div className="">
        <p className="font-semibold text-base">{props.data.label}</p>
        <p className="text-grey text-sm">
          Starts from{" "}
          <span className="text-primary font-semibold">
            NGN {price(props.data.id)?.toLocaleString()}
          </span>{" "}
          / {duration === "monthly" ? "month" : "year"}
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
