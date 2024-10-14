import SummaryCards from "../../../components/global/SummaryCards";
import SubscriptionHistoryFIlters from "./SubscriptionHistoryFIlters";
import TableComponent from "../../../components/global/TableComponent";
import dataList from "../subscription/data";
import useSubscriptionTableColumns from "../../../hooks/billing/useSubscriptionTableColumns";

export default function Subscription() {
  const { subscriptionColumns } = useSubscriptionTableColumns();

  const summaryData = [
    { label: "Total", value: 20 },
    { label: "Active", value: 20 },
    { label: "Deactivated", value: 20 },
  ];

  return (
    <div className="space-y-3 body-pad">
      <section className="flex justify-between items-center">
        <p className="font-semibold text-lg">History</p>
        <SubscriptionHistoryFIlters />
      </section>
      <SummaryCards summaryData={summaryData} />
      <section className="rounded-lg border-[1.5px]  border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <TableComponent
          scroll={{ x: 800 }}
          columns={subscriptionColumns as any}
          dataSource={dataList as any}
        />
      </section>
    </div>
  );
}
