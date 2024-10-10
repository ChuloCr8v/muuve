import { Button, Dropdown, MenuProps, Tabs, TabsProps } from "antd";
import { FaChevronDown } from "react-icons/fa";
import Subscriptions from "./Subscriptions";
import Heading from "../../../components/global/Header";
import PlanCards from "./PlanCards";
import { servicesData } from "../../../dummy/servicesData";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceType } from "../../../types";
import { EditOutlined } from "@ant-design/icons";
import { BiTrash } from "react-icons/bi";
import DropdownCustomItem from "../../../components/global/DropdownCustomItem";

const ServiceDetails = () => {
  const [currentPlan, setCurrentPlan] = useState<ServiceType>();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const plan = servicesData.find((item) => item.id === id);
    setCurrentPlan(plan);
  }, [id]);

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <DropdownCustomItem label={"Edit"} icon={<EditOutlined />} />,
      onClick: () => navigate(`/billing/services/edit-service/${id}`),
    },
    {
      key: 2,
      label: <DropdownCustomItem label={"Delete"} icon={<BiTrash />} />,
      onClick: () => console.log("first"),
    },
  ];

  const hasTiers = currentPlan?.plans?.length! > 1 ? true : false;

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Plans",
      children: (
        <PlanCards
          plans={currentPlan?.plans!}
          billingCycle={currentPlan?.billingCycle!}
        />
      ),
    },
    {
      key: "2",
      label: "Subscriptions",
      children: <Subscriptions />,
    },
  ];

  return (
    <div className="min-h-screen space-y-6 px-6 bg-white py-7">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Heading heading={currentPlan?.serviceName ?? ""} />
            <p className="text-grey text-sm w-full">
              {currentPlan?.description}
            </p>
          </div>
          <Dropdown menu={{ items }}>
            <Button
              type="primary"
              className="flex items-center gap-2 font-semibold"
            >
              Take Action <FaChevronDown />
            </Button>
          </Dropdown>{" "}
        </div>

        {currentPlan?.plans.length === 1 && (
          <div className="">
            <p className="font-semibold text-2xl">
              NGN{" "}
              {currentPlan?.plans.flatMap((plan) =>
                plan.price.toLocaleString()
              )}
              <span className="text-grey font-normal text-sm">
                /{currentPlan?.billingCycle === "monthly" ? "month" : "year"}
              </span>
            </p>
          </div>
        )}

        {hasTiers ? (
          <Tabs defaultActiveKey="1" items={tabItems} />
        ) : (
          <Subscriptions />
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
