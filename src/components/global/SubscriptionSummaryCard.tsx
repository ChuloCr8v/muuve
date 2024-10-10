import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { vat } from "../../views/billing/subscription/NewSubscription";
import TableRowData from "./TableRowData";
import DiscountModal, { DiscountFieldsDataType } from "./DiscountModal";
import { NewSubscriptionFormDataType } from "../../types";

type Props = {
  formData: NewSubscriptionFormDataType;
};

const SubscriptionSummaryCard = (props: Props) => {
  const [openDiscountModal, setOpenDiscountModal] = useState(false);
  const [discounts, setDiscounts] = useState<Array<DiscountFieldsDataType>>([]);

  const subscriptionSubtotal = () => {
    const subtotal = props.formData.services?.reduce((acc, currentService) => {
      return acc + currentService.amount;
    }, 0);

    return subtotal;
  };

  const totalCost = () => {
    // Calculate percentage discounts
    const percentageDiscounts = discounts.filter(
      (discount) => discount.type === "percentage"
    );
    const totalPercentageDiscounts = percentageDiscounts.reduce(
      (acc, currentDiscount) => acc + currentDiscount.value,
      0
    );

    // Apply percentage discount to the subtotal
    const percentageDiscount =
      (totalPercentageDiscounts / 100) * subscriptionSubtotal();
    const totalAfterPercentageDiscount =
      subscriptionSubtotal() - percentageDiscount;

    // Calculate fixed discounts
    const fixedDiscounts = discounts.filter(
      (discount) => discount.type === "fixed"
    );
    const totalFixedDiscounts = fixedDiscounts.reduce(
      (acc, currentDiscount) => acc + currentDiscount.value,
      0
    );

    // Apply fixed discounts after percentage discount
    const totalAfterFixedDiscount =
      totalAfterPercentageDiscount - totalFixedDiscounts;

    // Calculate VAT and add it to the total
    const getVat = (totalAfterFixedDiscount * vat) / 100;
    const totalAfterVat = totalAfterFixedDiscount + getVat;

    return totalAfterVat;
  };
  return (
    <div className="border-[1px] w-[40%] h-fit py-[15px] px-[12px] border-[#E9EAEB] bg-[#F8F8F8] rounded-lg">
      <div className="space-y-[12px]">
        <div className="">
          <TableRowData
            wrapperClassName="flex items-center justify-between border-b pb-1"
            mainText={"Subtotal"}
            mainTextStyle="text-grey uppercase"
            tagText={
              "NGN" + " " + (subscriptionSubtotal()?.toLocaleString() ?? "")
            }
            tagTextStyle="font-semibold !text-customBlack"
          />

          <div className="my-1 border-b pb-1">
            <TableRowData
              mainText="Discounts"
              mainTextStyle="uppercase font-semibold"
              wrapperClassName="pb-1"
            />

            {discounts.length ? (
              <div className="space-y-1">
                {discounts?.map((discount) => (
                  <div
                    key={discount.id}
                    className="flex items-center gap-4 w-full"
                  >
                    <TableRowData
                      wrapperClassName="flex items-center justify-between w-full"
                      mainText={discount.label}
                      mainTextStyle="text-grey uppercase"
                      tagText={
                        (discount.type === "fixed" ? "NGN" : "") +
                        " " +
                        discount.value +
                        (discount.type === "percentage" ? "%" : "")
                      }
                      tagTextStyle="font-semibold !text-customBlack"
                    />
                    <CloseOutlined
                      className="text-red-600 cursor-pointer"
                      onClick={() =>
                        setDiscounts(
                          discounts.filter((d) => d.id !== discount.id)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}

            <Button
              type="dashed"
              onClick={() => setOpenDiscountModal(true)}
              className="flex items-center text-[13px] my-4 font-semibold border-[#0A95CC66] text-[#0A95CC]"
            >
              <PlusCircleOutlined className="text-[13px]" />
              <span>Add Discount </span>
            </Button>
          </div>

          <TableRowData
            wrapperClassName="flex items-center justify-between"
            mainText={"Vat"}
            mainTextStyle="text-grey uppercase"
            tagText={vat + "%"}
            tagTextStyle="font-semibold !text-customBlack"
          />
        </div>

        <div className="">
          <TableRowData
            wrapperClassName="flex items-center justify-between"
            mainText={"Total"}
            mainTextStyle="text-grey uppercase"
            tagText={"NGN" + " " + totalCost().toLocaleString()}
            tagTextStyle="font-semibold !text-customBlack"
          />
        </div>
      </div>

      <DiscountModal
        isOpen={openDiscountModal}
        setIsOpen={setOpenDiscountModal}
        discounts={discounts}
        setDiscounts={setDiscounts}
      />
    </div>
  );
};

export default SubscriptionSummaryCard;
