import { Button } from "antd";
import { SelectedProductSummaryType } from "./ProductsCustomizationComponent";
import SingleProductSummaryCard from "./SingleProductSummaryCard";

const SummaryComponent = () => {
  const duration = JSON.parse(localStorage.getItem("duration") ?? "");
  const getLocallyStoredProductsSummary = localStorage.getItem(
    "selectedProductsSummary"
  );
  const locallyStoredProductsSummary = getLocallyStoredProductsSummary
    ? JSON.parse(getLocallyStoredProductsSummary)
    : [];

  const subTotal = locallyStoredProductsSummary.reduce(
    (sum: number, current: { tierValue: number }) => sum + current.tierValue,
    0
  );

  console.log(subTotal);
  return (
    <div className="grid grid-cols-2 justify-center w-full gap-10">
      {
        //Check index.css for summary-cards extra style
      }
      <div className="border h-fit rounded-lg p-4 summary-cards">
        {locallyStoredProductsSummary.map(
          (product: SelectedProductSummaryType) => (
            <div className="grid gap-2">
              <h3 className="font-semibold text-base">{product.product}</h3>
              <div className="text-sm flex justify-between items-center space-y-2">
                <p className="text-grey">
                  {product.productId === "BS" ? "Customer Seats" : "Plan"}
                </p>
                <p className="text-black font-[500] capitalize">
                  {product.tierLabel}
                </p>
              </div>
              <div className="text-sm flex justify-between items-center">
                <p className="text-grey">Amount</p>
                <p className="text-black font-semibold">
                  {" "}
                  NGN {product.tierValue.toLocaleString()}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex flex-col justify-between gap-6 items-end">
        {" "}
        <SingleProductSummaryCard subTotal={subTotal} duration={duration} />
        <Button type="primary" className="w-[164px] font-semibold">
          Proceed to payment
        </Button>
      </div>
    </div>
  );
};

export default SummaryComponent;
