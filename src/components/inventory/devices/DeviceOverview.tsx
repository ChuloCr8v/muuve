import { useState } from "react";
import Barcode from "/assets/barcode.png";
import DeviceClip3 from "/assets/image 6.svg";
import DeviceClip2 from "/assets/image 7.svg";
import DeviceClip from "/assets/image 8.svg";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { ExclamationCircleOutlined, CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";

interface Prop {
  data: any
}


export default function OverviewDevice(props: Prop) {
  const {data} = props
  const imgList = [
    { img: DeviceClip },
    { img: DeviceClip2 },
    { img: DeviceClip3 },
  ];
  const [selectedImg, setSelectedImg] = useState(imgList[0].img);

  const handleImageClick = (img: string) => {
    setSelectedImg(img);
  };


  return (
    <div className="space-y-[16px]">
      <h2 className="text-[16px] font-semibold">Basic Information</h2>
      <section className="grid grid-cols-5 w-full space-x-[16px]">
        <section className="block col-span-2 w-[100%] space-y-[16px]">
          <section className=" h-fit py-[24px] px-[47px]   border-[#E9EAEB] border-[1px] rounded-md">
            <div className=" text-center py-[12px] space-y-[16px] rounded-md gap-[8px]">
              <img src={selectedImg} alt="" className="w-[144px] h-[144px]" />
              <div className="flex space-x-[16px] justify-center">
                {imgList.map((img, index) => (
                  <div
                    onClick={() => handleImageClick(img.img)}
                    className={twMerge(
                      "w-[32px] h-[32px]  border-[1.5px] rounded-md",
                      selectedImg === img.img
                        ? "border-[#0A95CC]"
                        : "border-[#E9EAEB]"
                    )}
                    key={index}
                  >
                    <img src={img.img} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="border-[#E9EAEB] border-[1px] justify-center rounded-md py-[24px] px-[19px]">
            <img src={Barcode} alt="" />
          </div>
        </section>

        <section className=" col-span-3 p-[16px] space-y-[8px]">
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">
              DEVICE NAME
            </span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.name}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">
              SERIAL NO.
            </span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.serialNumber}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">
              MANUFACTURER
            </span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.manufacturer}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">
              Part Number
            </span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.partNumber}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">
              AVAILABLE
            </span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.status}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">COST</span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.cost}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">Model</span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.model.name}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">Location</span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.location}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">Status</span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
            <Tag
          icon={
            data.status === "AVAILABLE" ? <ExclamationCircleOutlined /> :
            data.status === "FAULTY" ? <CloseCircleOutlined /> : <CheckCircleOutlined />
          }
          className={twMerge(
            "rounded-2xl tagSize font-semibold items-center",
            data.status === "ASSIGNED"
              ? "bg-[#E3FFE6] text-[#379D51] border-[#379D51]"
              :  data.status === "FAULTY"
              ? "bg-[#FFE1E1] text-[#F05050] border-[#F05050]"
              : "bg-[#FDF7DD] text-[#B9A325] border-[#B9A325]"
          )}
        >
          { data.status}
        </Tag>
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">
              VENDOR
            </span>{" "}
            <span className="text-[13px] font-semibold text-left w-[50%]">
              {data?.vendor}
            </span>
          </div>
          <div className="flex justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">
              DATE PRODUCED
            </span>
            <span className="text-[13px] font-semibold text-left w-[50%]">
                {format(new Date(data?.dateProcured), 'd MMM yyyy')}
            </span>
          </div>
          {/* <div className="flex items-center justify-between md:w-[90%] w-[100%]">
            <span className="text-[12px] text-[#777777B2] font-bold">
              PROCUCED BY
            </span>
            <span className="text-[13px] font-semibold text-left w-[50%] space-x-2 flex items-center">
              
            </span>
          </div> */}

          <div>
            <p className="text-[12px] text-[#777777B2] font-bold">
              DESCRIPTION
            </p>
            <p className="text-[13px] font-semibold text-left">
              {data?.description}
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
