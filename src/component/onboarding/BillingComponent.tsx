import { Slider, Input, SliderSingleProps } from "antd";
import { useState } from "react";
import ProductHeading from "./ProductHeading";
import { ProductsDataTypes } from "../../dummy/productsData";
import { SelectedProductSummaryType } from "./ProductsCustomizationComponent";

interface Props {
  selectedProducts: ProductsDataTypes[];
  setSelectedProducts: (arg: ProductsDataTypes[]) => void;
  selectedProductsSummary: SelectedProductSummaryType[];
  setSelectedProductsSummary: any;
  data: ProductsDataTypes;
  duration: string;
  id: string;
}

const BillingComponent = (props: Props) => {
  const [customerCount, setCustomerCount] = useState<number>(0);

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

    const findProduct = props.selectedProductsSummary.find(
      (product) => product.productId === props.data.id
    );

    if (findProduct) {
      props.setSelectedProductsSummary((prev: any) =>
        prev.map((item: any) =>
          item.productId === props.data.id ? planDetails : item
        )
      );
    } else {
      props.setSelectedProductsSummary((prev: any) => [...prev, planDetails]);
    }
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
      <div className="grid gap-4 w-[480px]">
        <ProductHeading
          productLabel={props.data.label}
          subtitle={
            "The selected number of customer seats will determine the price."
          }
          selectedProducts={props.selectedProducts}
          setSelectedProducts={props.setSelectedProducts}
          id={props.id}
          setSelectedProductsSummary={props.setSelectedProductsSummary}
          selectedProductsSummary={props.selectedProductsSummary}
        />

        <div className="w-full grid gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default BillingComponent;
