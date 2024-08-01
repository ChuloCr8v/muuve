const SingleProductSummaryCard = () => {
  const summaryData = [
    { label: "Billing Cycle", value: "Monthly" },
    { label: "Sub Total", value: 400000 },
    { label: "VAT", value: 2000 },
  ];

  return (
    <div className="border rounded-md p-4 pb-2 w-[400px] h-full flex flex-col">
      <div className="h-full space-y-1">
        {summaryData.map((data) => (
          <div className="flex items-center justify-between" key={data.label}>
            <p className="text-grey">{data.label}</p>
            <p className="font-[500]">
              {data.label !== "Billing Cycle" && "NGN"}
              {data.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-2 mt-6">
        <p className="font-[500]">Total</p>
        <p className="text-primary font-[500]">NGN 400000</p>
      </div>
    </div>
  );
};

export default SingleProductSummaryCard;
