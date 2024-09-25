import { ReactNode } from "react";
import Watermark from "../../../public/mi-bg.png";
import SideNav from "./SideNav";
import Header from "./Header";

export default function Layout(props: { children: ReactNode }) {
  return (
    <div className="flex max-h-screen bg-gray-50 overflow-x-hidden w-[100vw] ">
      <div className=" flex w-screen ">
        <div className="min-h-[100vh] bg-[#EFF7FB] hidden md:flex w-[250px] pb-10">
          <SideNav />
        </div>

        <div className="">
          <div className="h-[72px] w-[100vw] md:w-[calc(100vw-230px)] bg-white pt-[20px] items-center px-[24px] border-b-[1px] border-[var(--greygrey-400-f-0-f-1-f-3, #F0F1F3)]">
            <Header />
          </div>

          <div className="h-[calc(100vh-122px)]  w-[100vw] md:w-[calc(100vw-230px)] px-[24px] py-[32px] overflow-y-auto">
            <div className="relative z-10">{props.children}</div>
            <img
              className="absolute z-0 md:left-[40%] lg:bottom-[calc(100vh*0.2)] md:bottom-[calc(100vh*0.05)] bottom-[calc(100vh*0.3)] left-[20%] md:w-[400px] w-[60%] "
              src={Watermark}
            />
          </div>

          <div className="h-[50px] w-full md:w-[calc(100vw-230px)] border-t-[1.5px] items-center bg-white px-[24px] flex  justify-center md:justify-between">
            <span>
              Copyright {new Date().getFullYear()} All Rights Reserved Zoracom
            </span>
            <div className="space-x-8 hidden md:flex">
              <span className="cursor-pointer">Terms</span>
              <span className="cursor-pointer">Privacy Policy</span>
            </div>
          </div>

          {/* <TermsInfo open={showModal}/>

        <PrivacyInfo open={showModal}/> */}
        </div>
      </div>
    </div>
  );
}
