import { ReactNode, useState } from "react";
import Watermark from "/mi-bg.png";
import SideNav from "./SideNav";
import Header from "./Header";
import { twMerge } from "tailwind-merge";
import { Drawer } from "antd";
import ResetPasswordModal from "../ResetPasswordModal";
import AssignTicketModal from "../../views/incidence/AssignTicketModal";
import ResolveTicketModal from "../../views/incidence/ResolveTicketModal";
import UpdateTicketStatusModal from "../../views/incidence/UpdateTicketStatusModal";
import ReopenTicketModal from "../../views/incidence/ReopenTicketModal";
import EscalateTicketModal from "../../views/incidence/EscalateTicketModal";
import NewTicketDrawer from "../../views/incidence/NewTicketDrawer";
import UpdateUSerStatusModal from "../../views/Admin/modals/UpdateUSerStatusModal";
import UpdateUserDrawer from "../../views/Admin/modals/UpdateUserDrawer";

export default function Layout(props: { children: ReactNode }) {
  const [collapse, setCollapse] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="flex max-h-screen bg-gray-50 overflow-x-hidden w-[100vw] ">
      <div className=" flex w-screen ">
        <div
          className={twMerge(
            "min-h-[100vh] bg-[#EFF7FB] hidden md:flex py-[18px] ",
            collapse ? "w-[50px] shadow-md" : "w-[250px]"
          )}
        >
          <SideNav collapse={collapse} />
        </div>

        <div className="">
          <div
            className={twMerge(
              "h-[50px] w-[100vw]  bg-white py-[10px] items-center px-[24px] border-b-[1px] border-[var(--greygrey-400-f-0-f-1-f-3, #F0F1F3)]",
              collapse ? "md:w-[calc(100vw-50px)]" : "md:w-[calc(100vw-230px)]"
            )}
          >
            <Header
              open={setOpenDrawer}
              setCollapse={setCollapse}
              collapse={collapse}
            />
          </div>

          <div
            className={twMerge(
              "h-[calc(100vh-100px)]  w-[100vw]  overflow-y-auto",
              collapse ? "md:w-[calc(100vw-50px)]" : "md:w-[calc(100vw-230px)]"
            )}
          >
            <div className="relative z-10">{props.children}</div>
            <img
              className="absolute z-0 md:left-[40%] lg:bottom-[calc(100vh*0.2)] md:bottom-[calc(100vh*0.05)] bottom-[calc(100vh*0.3)] left-[20%] md:w-[400px] w-[60%] "
              src={Watermark}
            />
          </div>

          <div
            className={twMerge(
              "h-[50px] text-[12px] text-[#777777] w-full md:w-[calc(100vw-230px)] border-t-[1.5px] items-center bg-white px-[24px] flex  justify-center md:justify-between",
              collapse ? "md:w-[calc(100vw-50px)]" : "md:w-[calc(100vw-230px)]"
            )}
          >
            <span>
              Copyright {new Date().getFullYear()} All Rights Reserved Zoracom
            </span>
            <div className="space-x-8 hidden md:flex ">
              <span className="cursor-pointer ">Terms</span>
              <span className="cursor-pointer">Privacy Policy</span>
            </div>
          </div>

          {/* <TermsInfo open={showModal}/>

        <PrivacyInfo open={showModal}/> */}
        </div>
        <Drawer
          className=" pt-[20px]"
          placement="left"
          width={250}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          closeIcon={null}
        >
          <SideNav collapse={collapse} />
        </Drawer>
      </div>

      {/* Global Modals */}
      <ResetPasswordModal />
      <NewTicketDrawer />
      <AssignTicketModal />
      <ResolveTicketModal />
      <UpdateTicketStatusModal />
      <ReopenTicketModal />
      <EscalateTicketModal />
      <UpdateUSerStatusModal />
      <UpdateUserDrawer />
    </div>
  );
}
