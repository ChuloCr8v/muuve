import Heading from "../../component/Global/Header";
import SummaryCards from "../../component/Global/SummaryCards";
import TableComponent from "../../component/Global/TableComponent";
import { ticketsData } from "../../dummy/ticketsData";
import useTicketsColumns from "../../hooks/useTicketsColumns";
import NewTicketDrawer from "./NewTicketDrawer";
import TicketsFilters from "./TicketsFilters";

export default function Tickets() {
  const { ticketTableColumns } = useTicketsColumns();

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

  return (
    <div className="p-4 pt-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Heading heading="Tickets" />
          <TicketsFilters />
        </div>

        <SummaryCards summaryData={summaryData} />
        <TableComponent columns={ticketTableColumns} dataSource={ticketsData} />
      </div>

      {/* New Ticket Form */}
      <NewTicketDrawer />
    </div>
  );
}
