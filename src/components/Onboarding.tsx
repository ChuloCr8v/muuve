// import React from 'react'
import { Button, Divider, Slider } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const Onboarding = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen gap-16 mx-20">
        <section className="w-[50%] bg-blue-400">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3>Billing</h3>
              <p>
                <MinusCircleOutlined /> <span> Remove</span>{" "}
              </p>
            </div>
            <p>
              The selected number of customers seats will determine the price
            </p>
            <div className="space-y-8">
              <div className="flex justify-between items-center gap-12">
                <Slider defaultValue={100} />
              </div>
              <div className="flex justify-between items-center">
                <p>Amount</p>
                <p>NGN 400, 000</p>
              </div>
            </div>
          </div>
          <Divider />
          <div className="space-y-4 mx-10">
            <div className="flex justify-between items-center">
              <h3>Project Management</h3>
              <p>
                <MinusCircleOutlined /> <span> Remove</span>{" "}
              </p>
            </div>

            <p>Select any plan of your choice</p>
            <div className="flex justify-between items-center ">
              <div className="w-32 h-32 border">
                <p>Basic</p>
                <p className="text-[#0A96CC]">NGN400, 000</p>
                <Button>Select</Button>
              </div>
              <div className="w-32 h-32 border">
                <p>Standard</p>
                <p className="text-[#0A96CC]">NGN400, 000</p>
                <Button>Select</Button>
              </div>
              <div className="w-32 h-32 border">
                <p>Premium</p>
                <p className="text-[#0A96CC]">NGN400, 000</p>
                <Button>Select</Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className="mx-10">
            <div className="flex justify-between items-center">
              <h3>Incident Management</h3>
              <p>
                <MinusCircleOutlined /> <span> Remove</span>{" "}
              </p>
            </div>

            <p>Select any plan of your choice</p>
            <div className="flex justify-between items-center">
              <div className="w-32 h-32 border rounded-md">
                <p>Basic</p>
                <p className="text-[#0A96CC]">NGN400, 000</p>
                <Button>Select</Button>
              </div>
              <div className="w-32 h-32 border rounded-md">
                <p>Standard</p>
                <p className="text-[#0A96CC]">NGN400, 000</p>
                <Button>Select</Button>
              </div>
              <div className="w-32 h-32 border rounded-md">
                <p>Premium</p>
                <p className="text-[#0A96CC]">NGN400, 000</p>
                <Button>Select</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-[50%] border bg-red-200">
          <div className="w-[300px] h-[280px] border ">
            <div>
              <p>Billing Cycle</p>
              <p>Monthly</p>
            </div>
            <div>
              <p>Sub total</p>
              <p>NGN 400, 000</p>
            </div>
            <div>
              <p>Billing Cycle</p>
              <p>NGN 2, 000</p>
            </div>
            <div>
              <p>Total</p>
              <p className="text-[#0A96CC] font-bold">NGN 100, 000</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Onboarding;
