interface Props {
  subTotal: number;
  duration: string;
}

const SingleProductSummaryCard = (props: Props) => {
  const VAT = 2000;

  const summaryData = [
    { label: "Billing Cycle", value: props.duration },
    { label: "Sub Total", value: props.subTotal.toLocaleString() },
    { label: "VAT", value: VAT.toLocaleString() },
  ];

  return (
    <div className="border rounded-md p-4 pb-2 w-[400px] h-fit flex flex-col">
      <div className="h-fit space-y-1">
        {summaryData.map((data) => (
          <div className="flex items-center justify-between" key={data.label}>
            <p className="text-grey capitalize">{data.label}</p>
            <p className="font-[500] capitalize">
              {data.label !== "Billing Cycle" && "NGN"} {data.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-2 mt-6">
        <p className="font-[500]">Total</p>
        <p className="text-primary font-[500]">
          NGN {(props.subTotal + VAT).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SingleProductSummaryCard;
