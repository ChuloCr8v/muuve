import { Breadcrumb, Button } from "antd";
import ProductsCustomizationComponent from "../../component/onboarding/ProductsCustomizationComponent";
import SingleProductSummaryCard from "../../component/onboarding/SingleProductSummaryCard";
import AccountLayout from "./AccountLayout";

const PlanUpdate = () => {
  return (
    <AccountLayout>
      <div className="bg-white rounded-md border p-4 space-y-4">
        <Breadcrumb
          items={[{ title: "Billing" }, { title: "Billing System" }]}
        />
        <div className="grid grid-cols-5 items-start gap-6">
          <div className="col-span-3">
            {" "}
            <ProductsCustomizationComponent />
          </div>
          <div className="col-span-2 flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <Button>Cancel</Button>
              <Button type="primary">Upgrade</Button>
            </div>
            <SingleProductSummaryCard subTotal={0} duration={""} />
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default PlanUpdate;
