import { useNavigate } from "react-router-dom";
import Heading from "../../components/global/Header";
import SummaryCards from "../../components/global/SummaryCards";
import TableComponent from "../../components/global/TableComponent";
import { ticketsData } from "../../dummy/ticketsData";
import useTicketsColumns from "../../hooks/useTicketsColumns";
import NewTicketDrawer from "./NewTicketDrawer";
import TicketsFilters from "./TicketsFilters";

export default function Tickets() {
  const { ticketTableColumns } = useTicketsColumns();
  const navigate = useNavigate();

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
          onRow={(record) => ({
            onClick: () => handleRowClick(record.id),
          })}
          columns={ticketTableColumns}
          dataSource={ticketsData}
        />
      </div>

      {/* New Ticket Form */}
      <NewTicketDrawer />
    </div>
  );
}
