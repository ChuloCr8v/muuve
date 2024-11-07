import { useNavigate } from "react-router-dom";
import Heading from "../../components/global/Header";
import SummaryCards from "../../components/global/SummaryCards";
import TableComponent from "../../components/global/TableComponent";
import useTicketsColumns from "../../hooks/incidence/useTicketsColumns";
import TicketsFilters from "./TicketsFilters";
import { useListTicketsQuery } from "../../api/ticket.api";

export default function Tickets() {
  const { ticketTableColumns } = useTicketsColumns();
  const navigate = useNavigate();

  const { data: ticketsData, isLoading } = useListTicketsQuery();

  console.log(ticketsData);

  const summaryData = [
    {
      label: "Total",
      value: 8,
    },
    {
      label: "Closed",
      value: 3,
    },
    {
      label: "Open",
      value: 5,
    },
  ];

  const handleRowClick = (ticketID: string) => {
    navigate(`/incidence/tickets/${ticketID}`);
  };

  return (
    <div className="p-4 pt-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Heading heading="Tickets" />
          <TicketsFilters />
        </div>

        <SummaryCards summaryData={summaryData} />
        <TableComponent
          loading={isLoading}
          onRow={(record) => ({
            onClick: () => handleRowClick(record.id),
          })}
          columns={ticketTableColumns}
          dataSource={ticketsData}
        />
      </div>
    </div>
  );
}
