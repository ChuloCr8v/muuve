import { Slider, Input } from "antd";
import { useState } from "react";
import ProductHeading from "./ProductHeading";
import SingleProductSummaryCard from "./SingleProductSummaryCard";
import { ProductsDataTypes } from "../../dummy/productsData";

interface Props {
  selectedProducts: ProductsDataTypes[];
  setSelectedProducts: (arg: ProductsDataTypes[]) => void;
  data: ProductsDataTypes;
  duration: string;
  id: string;
}

const BillingComponent = (props: Props) => {
  const [customerCount, setCustomerCount] = useState(0);

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
        />

        <div className="w-full grid gap-4">
          <div className="w-full flex items-center gap-6">
            <label htmlFor="" className="text-nowrap font-[500]">
              Customer Seats
            </label>
            <Slider
              className="w-full"
              value={customerCount}
              defaultValue={customerCount}
              onChange={(value) => setCustomerCount(value)}
              max={1000}
            />
            <Input
              min={0}
              className="w-fit"
              value={customerCount}
              type="number"
              onChange={(e) => setCustomerCount(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between font-semibold text-base">
            <p className="">Amount</p>
            <p className="text-primary font-bold">
              {customerCount > 0 && "NGN"}
              {customerCount < 1
                ? 0
                : customerCount > 200
                ? (400000).toLocaleString()
                : props.data.pricing.monthly[0].value.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <SingleProductSummaryCard />
    </div>
  );
};
export default BillingComponent;
