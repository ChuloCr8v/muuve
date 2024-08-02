import { Divider } from "antd";
import SingleProductSummaryCard from "./SingleProductSummaryCard";

const SummaryComponent = () => {
  return (
    <div className="grid grid-cols-2 justify-center w-full gap-10">
      <section className="w-[480px] h-fit bg-[#FDFDFD] space-y-2 rounded-md border">
        <div className="mx-6 py-4">
          <h3 className="font-bold">Billing</h3>
          <div className="text-sm flex justify-between items-center space-y-2">
            <p>Customer Seats</p>
            <p>200</p>
          </div>
          <div className="text-sm flex justify-between items-center">
            <p>Amount</p>
            <p>NGN 400, 000</p>
          </div>
        </div>
        <Divider className="" />
        <div className="mx-6 py-6">
          <h3 className="font-bold">Project Management</h3>
          <div className="text-sm flex justify-between items-center space-y-2">
            <p>Customer Seats</p>
            <p>200</p>
          </div>
          <div className="text-sm flex justify-between items-center">
            <p>Amount</p>
            <p>NGN 400, 000</p>
          </div>
        </div>
        <Divider className="" />
        <div className="mx-6 py-6">
          <h3 className="font-bold">Incident Management</h3>
          <div className="text-sm flex justify-between items-center space-y-2">
            <p>Customer Seats</p>
            <p>200</p>
          </div>
          <div className="text-sm flex justify-between items-center">
            <p>Amount</p>
            <p>NGN 400, 000</p>
          </div>
        </div>
      </section>
      {/* <section className="w-[400px] h-fit border bg-[#FDFDFD] space-y-2 rounded-md">
        <div className="mx-6 py-6">
          <h3 className="font-bold">Project Management</h3>
          <div className="text-sm flex justify-between items-center space-y-2">
            <p>Customer Seats</p>
            <p>200</p>
          </div>
          <div className="text-sm flex justify-between items-center">
            <p>Amount</p>
            <p>NGN 400, 000</p>
          </div>
        </div>
      </section> */}
      <SingleProductSummaryCard />
    </div>
  );
};

export default SummaryComponent;
