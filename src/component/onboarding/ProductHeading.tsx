import { MinusCircleOutlined } from "@ant-design/icons";

interface Props {
  productLabel: string;
  subtitle: string;
}
const ProductHeading = (props: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="space-y-1 w-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-base">{props.productLabel}</p>
          <div className="text-red-500 hover:text-red-600 duration-200 font-semibold cursor-pointer">
            <MinusCircleOutlined /> <span className="">Remove</span>
          </div>
        </div>

        <p className="text-grey">{props.subtitle}</p>
      </div>
    </div>
  );
};
export default ProductHeading;
