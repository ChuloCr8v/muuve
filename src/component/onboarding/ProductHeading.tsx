import { MinusCircleOutlined } from "@ant-design/icons";
import { ProductsDataTypes } from "../../dummy/productsData";

interface Props {
  productLabel: string;
  subtitle: string;
  selectedProducts: Array<ProductsDataTypes>;
  setSelectedProducts: (arg: Array<ProductsDataTypes>) => void;
  id: string;
}
const ProductHeading = (props: Props) => {
  //Remove Product
  const removeProduct = () => {
    const updatedSelectedProducts = props.selectedProducts.filter(
      (product) => product.id !== props.id
    );

    props.setSelectedProducts(updatedSelectedProducts);

    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(updatedSelectedProducts)
    );
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="space-y-1 w-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-base">{props.productLabel}</p>
          <div
            onClick={removeProduct}
            className="text-red-500 hover:text-red-600 duration-200 font-semibold cursor-pointer"
          >
            <MinusCircleOutlined /> <span className="">Remove</span>
          </div>
        </div>

        <p className="text-grey">{props.subtitle}</p>
      </div>
    </div>
  );
};
export default ProductHeading;
