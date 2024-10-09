import { useNavigate } from "react-router-dom";
import Heading from "../../../components/global/Header";
import SummaryCards from "../../../components/global/SummaryCards";
import TableComponent from "../../../components/global/TableComponent";
import useSubscriptionTableColumns from "../../../hooks/billing/useSubscriptionTableColumns";
import { SubscriptionDataType } from "../../../types";
import dataList from "./data";
import SubscriptionFilter from "./SubscriptionFilter";

export default function Subscription() {
  const { subscriptionColumns } = useSubscriptionTableColumns();

  const navigate = useNavigate();

  const summaryData = [
    {
      label: "Total",
      value: 22,
    },
    {
      label: "Active",
      value: 8,
    },
    {
      label: "Deactivated",
      value: 10,
    },
    {
      label: "Renew Soon",
      value: 10,
    },
    {
      label: "Expiring Soon",
      value: 10,
    },
  ];

  const handleRowClick = (record: SubscriptionDataType) => {
    navigate(`/billing/subscription/${record.id}`);
  };

  return (
    <div className="p-4 body-pad space-y-3">
      <section className="flex justify-between">
        <Heading heading="Subscription" />
        <SubscriptionFilter />
      </section>

      <section className="space-y-3">
        <SummaryCards summaryData={summaryData} />
        <TableComponent
          onRow={(record: SubscriptionDataType) => ({
            onClick: () => handleRowClick(record),
          })}
          columns={subscriptionColumns}
          dataSource={dataList}
        />
      </section>
    </div>
  );
}
