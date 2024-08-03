import { MinusCircleOutlined } from "@ant-design/icons";
import { ProductsDataTypes } from "../../dummy/productsData";
import { SelectedProductSummaryType } from "./ProductsCustomizationComponent";

interface Props {
  productLabel: string;
  subtitle: string;
  selectedProducts: Array<ProductsDataTypes>;
  setSelectedProducts: (arg: Array<ProductsDataTypes>) => void;
  id: string;
  selectedProductsSummary: Array<SelectedProductSummaryType>;
  setSelectedProductsSummary: (arg: SelectedProductSummaryType[]) => void;
}
const ProductHeading = (props: Props) => {
  console.log(props.selectedProducts, props.selectedProductsSummary);
  //Remove Product from list of selected products
  const removeProduct = () => {
    const updatedSelectedProducts = props.selectedProducts.filter(
      (product) => product.id !== props.id
    );
    props.setSelectedProducts(updatedSelectedProducts);

    //Also remove product from list of products summary in order to reflect on the summary price
    const updatedSelectedProductsSummary = props.selectedProductsSummary.filter(
      (product) => product.productId !== props.id
    );
    props.setSelectedProductsSummary(updatedSelectedProductsSummary);

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
