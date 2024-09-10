import { Input, Slider, SliderSingleProps } from "antd";
import { useState } from "react";
import { ProductsDataTypes } from "../../types";
import SingleProductCustomization from "../SingleProductCustomization";
import { useDispatch } from "react-redux";
import { customizedProducts } from "../../redux/productsSlice";
interface Props {
  data: ProductsDataTypes;
  id: string;
}

const BillingComponent = (props: Props) => {
  const [customerCount, setCustomerCount] = useState<number>(0);
  const dispatch = useDispatch();

  const handleCustomerCountSelect = (value: number | number[]) => {
    const numericValue = Array.isArray(value) ? value[0] : value;
    setCustomerCount(numericValue);

    // Calculate cost using the selected value
    const cost = customerSeatsCost(numericValue);

    const planDetails = {
      productId: props.data.id,
      product: props.data.label,
      tierValue: cost,
      tierLabel: numericValue,
    };

    dispatch(customizedProducts(planDetails));
  };

  // Calculate the cost of customer seats per 200 customers
  const customerSeatsCost = (customerCount_: number) => {
    const costPerCustomerBlock = 200000;
    const customersPerBlock = 200;

    const numberOfBlocks = Math.ceil(customerCount_ / customersPerBlock);
    const cost = numberOfBlocks * costPerCustomerBlock;

    return cost;
  };

  const marks: SliderSingleProps["marks"] = {
    0: "0",
    200: "200",
    400: "400",
    600: "600",
    800: "800",
    1000: "1000",
  };

  return (
    <div className="flex items-center gap-8">
      <SingleProductCustomization
        data={props.data}
        children={
          <>
            <div className="w-full flex items-center gap-6">
              <label htmlFor="" className="text-nowrap font-[500]">
                Customer Seats
              </label>
              <Slider
                className="w-full"
                value={customerCount}
                onChange={handleCustomerCountSelect}
                max={1000}
                step={100}
                marks={marks}
              />
              <Input
                min={0}
                className="w-fit"
                value={customerCount}
                type="number"
                onChange={(e) =>
                  handleCustomerCountSelect(Number(e.target.value))
                }
              />
            </div>
            <div className="flex items-center justify-between font-semibold text-base">
              <p className="">Amount</p>
              <p className="text-primary font-semibold">
                {customerCount > 0 && "NGN"}{" "}
                {customerSeatsCost(customerCount).toLocaleString()}
              </p>
            </div>
          </>
        }
      />
    </div>
  );
};

export default BillingComponent;
